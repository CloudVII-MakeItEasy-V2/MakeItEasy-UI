import React, { useEffect, useState } from "react";
import "./orderHistory.css";

const COMPOSITE_SERVICE_URL = "https://makeiteasy-440104.ue.r.appspot.com";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const customerId = localStorage.getItem("customerId");

  // Define Header component
  const Header = () => (
    <header className="header">
      <div className="logo">Welcome to Order History!</div>
    </header>
  );

  // Define Footer component
  const Footer = () => (
    <footer className="footer">© 2024 MakeItEasy. All rights reserved.</footer>
  );

  // Fetch order history
  const fetchOrderHistory = async (customerId) => {
    const url = `${COMPOSITE_SERVICE_URL}/customer/orders/${customerId}?page=1&page_size=10`;
    console.log(url);

    const token = localStorage.getItem("authToken");
    const grants = localStorage.getItem("grants");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        grants: grants,
        "X-Correlation-ID": "frontend-unique-id",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders. Status: ${response.status}`);
    }

    return await response.json();
  };

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        setError(null);
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
    return (
      <>
        <Header />
        <div className="order-history-container">
          <p>Loading order history...</p>
        </div>
        <Footer />
      </>
    );
  }

  // Render error state
  if (error) {
    return (
      <>
        <Header />
        <div className="order-history-container">
          <p className="error">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  // Render no orders found state
  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="order-history-container">
          <h1>Order History</h1>
          <p>No orders found. Please check your account or try again later.</p>
        </div>
        <Footer />
      </>
    );
  }

  // Render order list
  return (
    <>
      <Header />
      <div className="order-history-container">
        <h1>Order History</h1>
        <div className="order-list-wrapper">
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
      </div>
      <Footer />
    </>
  );
};

export default OrderHistoryPage;