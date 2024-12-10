import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Orders.css';
import Navbar from '../../Navbar'; // Adjust the path as necessary
import Footer from '../../Footer'; // Adjust the path as necessary

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersForSeller = async () => {
      try {
        // Fetch seller's products
        const productsResponse = await fetch('http://127.0.0.1:8000/seller/1/products');
        if (!productsResponse.ok) {
          throw new Error(`Error fetching products: ${productsResponse.statusText}`);
        }
        const productsData = await productsResponse.json();

        // Fetch seller dashboard URL
        const sellerManagementResponse = await fetch('http://127.0.0.1:8000/seller_management/1');
        if (!sellerManagementResponse.ok) {
          throw new Error(`Error fetching seller management info: ${sellerManagementResponse.statusText}`);
        }
        const sellerManagementData = await sellerManagementResponse.json();
        const dashboardUrl = sellerManagementData.dashboard_url;

        // Extract product IDs
        const sellerProductIds = productsData.products.map((product) => product.product_id);

        // Fetch all orders
        const ordersResponse = await fetch('http://127.0.0.1:8001/orders');
        if (!ordersResponse.ok) {
          throw new Error(`Error fetching orders: ${ordersResponse.statusText}`);
        }
        const ordersData = await ordersResponse.json();

        // Filter orders and fetch tracking details
        const filteredOrders = await Promise.all(
          ordersData.orders
            .filter((order) =>
              order.items.some((item) => sellerProductIds.includes(item.product_id))
            )
            .map(async (order) => {
              const relevantItems = order.items.filter((item) =>
                sellerProductIds.includes(item.product_id)
              );

              // Fetch tracking details for each order
              const trackingResponse = await fetch(`http://127.0.0.1:8001/orders/${order.order_id}/track`);
              const trackingData = trackingResponse.ok ? await trackingResponse.json() : null;

              return {
                orderNumber: order.order_id,
                purchaser: `Customer ${order.customer_id}`,
                itemOrdered: relevantItems
                  .map((item) => `Product ${item.product_id} x${item.quantity}`)
                  .join(', '),
                quantity: relevantItems.reduce((sum, item) => sum + item.quantity, 0),
                timeOrdered: new Date(order.created_date).toLocaleString(),
                amount: `$${order.total_amount}`,
                status: trackingData
                  ? <a href={trackingData.tracking_url} target="_blank" rel="noopener noreferrer">
                      Track Order
                    </a>
                  : 'Tracking Unavailable',
                shippedTo: dashboardUrl, // Use the dashboard URL for the shipping column
              };
            })
        );

        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders for seller:', error.message);
      }
    };

    fetchOrdersForSeller();
  }, []);

  return (
    <div className="orders-container">
      <Navbar />
      <div className="left">
        <button onClick={() => navigate('/SellerService')} className="back-button">
          Home
        </button>
      </div>
      <div className="center">
        <h1>Orders</h1>
        {orders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Purchaser</th>
                <th>Item Ordered</th>
                <th>Quantity</th>
                <th>Time Ordered</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Shipping</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderNumber}>
                  <td>{order.orderNumber}</td>
                  <td>{order.purchaser}</td>
                  <td>{order.itemOrdered}</td>
                  <td>{order.quantity}</td>
                  <td>{order.timeOrdered}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                  <td>
                    <a href={order.shippedTo} target="_blank" rel="noopener noreferrer">
                      Dashboard
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders available for your products.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
