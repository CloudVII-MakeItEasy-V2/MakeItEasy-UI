import React, { useEffect, useState } from "react";
import "./orderHistory.css";

const COMPOSITE_SERVICE_URL = process.env.REACT_APP_COMPOSITE_SERVICE_URL || "http://127.0.0.1:8080";

const fetchOrderHistory = async (customerId, page = 1, per_page = 10) => {
  const url = `${COMPOSITE_SERVICE_URL}/orders?customer_id=${customerId}&page=${page}&page_size=${per_page}`;
  const token = localStorage.getItem("authToken");
  const grants = localStorage.getItem("grants");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      grants: grants,
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
  const [page, setPage] = useState(1);
  const per_page = 10;

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchOrderHistory(customerId, page, per_page);
        setOrders(fetchedOrders.orders || []);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadOrderHistory();
  }, [customerId, page]);

  if (loading) {
    return <p>Loading order history...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="order-history-container">
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <p>No orders found. Please check your account or try again later.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.order_id} className="order-item">
              <div className="order-details">
                <p>Order ID: {order.order_id}</p>
                <p>Total: ${Number(order.total_amount).toFixed(2)}</p>
                <p>Tracking Number: {order.tracking_number || "N/A"}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="pagination-controls">
        {page > 1 && (
          <button onClick={() => setPage((prevPage) => prevPage - 1)}>
            Previous Page
          </button>
        )}
        {orders.length === per_page && (
          <button onClick={() => setPage((prevPage) => prevPage + 1)}>
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderHistoryPage;