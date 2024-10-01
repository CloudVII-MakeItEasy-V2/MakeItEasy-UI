import React, { useEffect, useState } from "react";
import "./orderHistory.css";

// call API to get this customer's orders
const fetchOrderHistory = async (customerId) => {
  //const response = await fetch(`/api/orders?customerId=${customerId}`);
  //const data = await response.json();
  // hard-coded data for temporary use
  const data = [
    {
      "id": 1,
      "date": "2024-09-29T12:34:00Z",
      "total": 120.50,
      "status": "Delivered"
    },
    {
      "id": 2,
      "date": "2024-09-15T09:15:00Z",
      "total": 75.00,
      "status": "Shipped"
    }
  ]
  return data;
};

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  // hard-coded data for temporary use
  const customerId = "1234567";

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchOrderHistory(customerId);
        // present order from the most recent to the oldest
        const sortedOrders = fetchedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
      } catch (err) {
        setError("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };
    loadOrderHistory();
  }, [customerId]);

  if (loading) {
    return <p>Loading order history...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      <p>Here is the history of your past orders:</p>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-header">
                <span>Order ID: {order.id}</span>
                <span>Date: {new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="order-details">
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistoryPage;