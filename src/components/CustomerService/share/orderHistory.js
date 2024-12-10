import React, { useEffect, useState } from "react";
import "./orderHistory.css";

const COMPOSITE_SERVICE_URL = "http://127.0.0.1:8080";

// Fetch order history from the API Gateway
const fetchOrderHistory = async (customerId) => {
  // Include default pagination parameters (if required by the backend)
  const url = `${COMPOSITE_SERVICE_URL}/customer/orders/${customerId}?page=1&page_size=10`;
  console.log(url);

  const token = localStorage.getItem("authToken");
  const grants = localStorage.getItem("grants");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, // Ensure "Bearer" prefix is included
      grants: grants,
      "X-Correlation-ID": "frontend-unique-id", // Optional, for tracing
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch orders. Status: ${response.status}`);
  }

  return await response.json();
};

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before fetching
        const fetchedOrders = await fetchOrderHistory(customerId);

        setOrders(fetchedOrders.orders || []);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrderHistory();
  }, [customerId]);

  // Render loading state
  if (loading) {
    return <p>Loading order history...</p>;
  }

  // Render error state
  if (error) {
    return <p className="error">{error}</p>;
  }

  // Render no orders found state
  if (orders.length === 0) {
    return (
      <div className="order-history-container">
        <h1>Order History</h1>
        <p>No orders found. Please check your account or try again later.</p>
      </div>
    );
  }

  // Render order list
  return (
    <div className="order-history-container">
      <h1>Order History</h1>

      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.order_id} className="order-item">
            <div className="order-details">
              <p><strong>Order ID:</strong> {order.order_id}</p>
              <p><strong>Total:</strong> ${Number(order.total_amount).toFixed(2)}</p>
              <p><strong>Tracking Number:</strong> {order.tracking_number || "N/A"}</p>
              <p><strong>Status:</strong> {order.status || "Unknown"}</p>
              <p><strong>Order Date:</strong> {new Date(order.created_date).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistoryPage;