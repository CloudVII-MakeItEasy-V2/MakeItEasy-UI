import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Orders.css';
import Navbar from '../../Navbar'; // Adjust the path as necessary
import Footer from '../../Footer'; // Adjust the path as necessary

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersForSeller = async () => {
      const sellerId = localStorage.getItem('sellerId'); // Get seller_id from localStorage
      if (!sellerId) {
        alert('No seller logged in');
        navigate('/SellerLogin');
        return;
      }

      try {
        setLoading(true);

        // Fetch products and seller management info concurrently
        const [productsResponse, sellerManagementResponse] = await Promise.all([
          fetch(`http://34.86.154.165:8000/seller/${sellerId}/products`),
          fetch(`http://34.86.154.165:8000/seller_management/${sellerId}`),
        ]);

        if (!productsResponse.ok || !sellerManagementResponse.ok) {
          throw new Error('Error fetching seller data');
        }

        const productsData = await productsResponse.json();
        const sellerManagementData = await sellerManagementResponse.json();
        const dashboardUrl = sellerManagementData.dashboard_url;

        // Create a lookup table for product names by product_id
        const productNameLookup = productsData.products.reduce((lookup, product) => {
          lookup[product.product_id] = product.name;
          return lookup;
        }, {});

        // Fetch orders
        const ordersResponse = await fetch(' https://coms4153-cloud-computing.ue.r.appspot.com/orders');
        if (!ordersResponse.ok) {
          throw new Error('Error fetching orders');
        }

        const ordersData = await ordersResponse.json();

        // Filter orders to include only relevant items
        const relevantOrders = ordersData.orders
          .map((order) => {
            const relevantItems = order.items.filter((item) =>
              productNameLookup[item.product_id]
            );

            // Skip the order if it has no relevant products
            if (relevantItems.length === 0) {
              return null;
            }

            return {
              order,
              relevantItems,
            };
          })
          .filter((order) => order !== null); // Remove null entries

        // Fetch tracking details for relevant orders
        const trackingDetails = await Promise.all(
          relevantOrders.map(async ({ order }) => {
            try {
              const trackingResponse = await fetch(`https://coms4153-cloud-computing.ue.r.appspot.com/orders/${order.order_id}/track`);
              if (trackingResponse.ok) {
                const trackingData = await trackingResponse.json();
                return { order_id: order.order_id, tracking_url: trackingData.tracking_url };
              }
              return { order_id: order.order_id, tracking_url: null };
            } catch {
              return { order_id: order.order_id, tracking_url: null };
            }
          })
        );

        // Create a map for tracking URLs
        const trackingMap = trackingDetails.reduce((map, tracking) => {
          map[tracking.order_id] = tracking.tracking_url;
          return map;
        }, {});

        // Process and set orders
        const processedOrders = relevantOrders.map(({ order, relevantItems }) => ({
          orderNumber: order.order_id,
          purchaser: `Customer ${order.customer_id}`,
          itemOrdered: relevantItems
            .map((item) => productNameLookup[item.product_id])
            .join(', '),
          quantity: relevantItems.reduce((sum, item) => sum + item.quantity, 0),
          timeOrdered: new Date(order.created_date).toLocaleString(),
          amount: `$${order.total_amount}`,
          status: trackingMap[order.order_id]
            ? <a href={trackingMap[order.order_id]} target="_blank" rel="noopener noreferrer">
                Track Order
              </a>
            : 'Tracking Unavailable',
          shippedTo: dashboardUrl,
        }));

        setOrders(processedOrders);
      } catch (error) {
        console.error('Error fetching orders for seller:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersForSeller();
  }, [navigate]);

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
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <>
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
                {orders.length > 0 ? (
                  orders.map((order) => (
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>No matching orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
