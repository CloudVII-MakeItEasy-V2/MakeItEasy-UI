import React, { useEffect, useState } from "react";
import "./orderHistory.css";

// Base URL for the order service, update with your actual environment's URL
const ORDER_SERVICE_URL = "http://localhost:8080";

// Function to call API to get this customer's orders
const fetchOrderHistory = async (customerId, status = '', page = 1, per_page = 10) => {
  try {
    const url = `${ORDER_SERVICE_URL}/customer/${customerId}/orders?` +
                `${status && `status=${status}&`}page=${page}&per_page=${per_page}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  // Hard-coded data for temporary use
  const customerId = "1";
  const status = 'Pending'; // Add status if needed
  const page = 1;
  const per_page = 10;

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchOrderHistory(customerId, status, page, per_page);
        // Present order from the most recent to the oldest
        const sortedOrders = fetchedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
      } catch (err) {
        setError("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };
    loadOrderHistory();
  }, [customerId, status, page, per_page]);

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