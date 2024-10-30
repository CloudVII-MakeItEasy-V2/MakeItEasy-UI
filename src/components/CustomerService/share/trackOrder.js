import React, { useState } from "react";
import "./trackOrder.css";

function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrackOrder = () => {
    if (trackingNumber.trim()) {
      alert(`Tracking order with number: ${trackingNumber}`);
      // tracking logic to be implemented...
    } else {
      alert("Please enter a valid tracking number.");
    }
  };

  return (
    <div className="track-order-container">
      <h1>Track Your Order</h1>
      <p>You can track an order by entering the tracking number below:</p>

      {/* Input box for tracking number */}
      <input
        type="text"
        className="tracking-input"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter your tracking number"
      />

      {/* Button to submit the tracking number */}
      <button className="track-button" onClick={handleTrackOrder}>
        Track Order
      </button>
    </div>
  );
}

export default TrackOrderPage;