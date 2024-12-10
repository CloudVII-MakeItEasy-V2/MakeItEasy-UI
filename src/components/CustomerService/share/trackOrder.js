import React, { useState } from "react";
import "./trackOrder.css";

function TrackOrderPage() {
  const [orderId, setOrderId] = useState(""); // Order ID input
  const [trackingDetails, setTrackingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Header for the Track Order page
  const Header = () => (
    <header className="header">
      <div className="logo">Track Your Order</div>
    </header>
  );

  // Footer for the Track Order page
  const Footer = () => (
    <footer className="footer">© 2024 MakeItEasy. All rights reserved.</footer>
  );

  const handleTrackOrder = async () => {
    // Retrieve required data from local storage
    const token = localStorage.getItem("authToken"); // JWT token
    const customerId = localStorage.getItem("customerId"); // Customer ID
    const grants = localStorage.getItem("grants");
    console.log(token);
    console.log(grants);

    if (!token || !customerId) {
      alert("Required data (token or customer ID) is missing. Please log in.");
      return;
    }

    // Ensure an Order ID is entered
    if (!orderId.trim()) {
      alert("Please enter a valid Order ID.");
      return;
    }

    setIsLoading(true); // Show loading state
    setError(null); // Clear previous errors
    setTrackingDetails(null); // Clear previous results

    try {
      // Send GET request to the tracking API
      const response = await fetch(
        `http://127.0.0.1:8080/customer/${customerId}/orders/${orderId}/tracking`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Include JWT token in Authorization header
            grants: `${grants}`, // Include grants header
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTrackingDetails(data); // Set tracking details on success
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to retrieve tracking details.");
      }
    } catch (err) {
      setError("An error occurred while fetching tracking details.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <>
      <Header />
      <div className="track-order-container">
        <h1>Track Your Order</h1>
        <p>You can track an order by entering the Order ID below:</p>

        {/* Input box for Order ID */}
        <input
          type="text"
          className="tracking-input"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your Order ID"
        />

        {/* Button to submit the Order ID */}
        <button className="track-button" onClick={handleTrackOrder}>
          Track Order
        </button>

        {/* Show loading state */}
        {isLoading && <p>Loading tracking details...</p>}

        {/* Show error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Show tracking details */}
        {trackingDetails && (
          <div className="tracking-details">
            <h2>Tracking Details</h2>
            <pre>{JSON.stringify(trackingDetails, null, 2)}</pre>
            {trackingDetails.link && (
              <a href={trackingDetails.link} target="_blank" rel="noopener noreferrer">
                View detailed tracking
              </a>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default TrackOrderPage;