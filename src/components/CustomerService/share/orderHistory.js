import React, { useEffect, useState } from "react";
import "./orderHistory.css";

const COMPOSITE_SERVICE_URL = "https://makeiteasy-440104.ue.r.appspot.com";
const fetchOrderHistory = async (customerId, page = 1, per_page = 10) => {
  const url = `${COMPOSITE_SERVICE_URL}/customer/${customerId}/orders?page=${page}&per_page=${per_page}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return await response.json();
};

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const customerId = 2; // Assuming a hardcoded customer ID for demonstration
  const page = 1;
  const per_page = 10;

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchOrderHistory(customerId, page, per_page);
        setOrders(fetchedOrders);
      } catch (err) {
        setError("Failed to load order history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadOrderHistory();
  }, [customerId, page, per_page]);

  if (loading) {
    return <p>Loading order history...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      <p>Here is the history of your orders:</p>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
  <li key={order.order_id} className="order-item">
    <div className="order-details">
      <p>Order ID: {order.order_id}</p>
      <p>Total: ${Number(order.total_amount).toFixed(2)}</p> {/* Updated this line */}
      <p>Tracking Number: {order.tracking_number || 'N/A'}</p>
    </div>
  </li>
))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistoryPage;