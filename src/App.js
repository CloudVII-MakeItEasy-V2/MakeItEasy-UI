import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ProfilePage from "./profile";
import TicketPage from "./ticket"
import MakeOrderPage from "./makeOrder"
import TrackOrderPage from "./trackOrder"
import OrderHistoryPage from "./orderHistory"
function Header() {
  return (
  <header className="header">
  <div className="logo">Welcome Customer!</div>
  <div className="button-group">
        <TicketButton />
        <ProfileButton />
  </div>
  </header>
  );
  }
// Profile Button Component
function ProfileButton() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <button className="profile-btn" onClick={handleClick}>
      P
    </button>
  );
}
function TicketButton() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleClick = () => {
    navigate("/ticket"); // Navigate to the profile page
  };
  return (
    <button className="ticket-btn" onClick={handleClick}>
      <i className="fas fa-headset"></i>
    </button>
  );
}
// Service Section
function Service() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const toMakeOrder = () => {
    navigate("/makeOrder"); // Navigate to the profile page
  };
  const toTrackOrder = () => {
    navigate("/trackOrder"); // Navigate to the profile page
  };
  const toOrderHistory = () => {
    navigate("/orderHistory"); // Navigate to the profile page
  };
  return (
    <section className="services">
      <button className="service-column" onClick={toMakeOrder}>
        <h2>Make an Order</h2>
        <p>Place an order quickly and easily with our user-friendly interface.</p>
      </button>
      <button className="service-column" onClick={toTrackOrder}>
        <h2>Track My Order</h2>
        <p>Keep track of your order status in real-time.</p>
      </button>
      <button className="service-column" onClick={toOrderHistory}>
        <h2>Order History</h2>
        <p>View your past orders and reorder with ease.</p>
      </button>
    </section>
  );
}

// Features Section
function Features() {
  return (
    <section className="features">
      <div className="featureStyle">
        <Feature title="Fast Delivery" description="Get your products delivered quickly and safely." />
      </div>
      <div className="featureStyle">
        <Feature title="Best Prices" description="We offer competitive prices on all our products." />
      </div>
      <div className="featureStyle">
        <Feature title="Customer Support" description="Our support team is available 24/7 to help you." />
      </div>
    </section>
  );
}

// Individual Feature Component
function Feature({ title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Footer Section
function Footer() {
  return <footer className="footer" style={footerStyle}>© 2024 MakeItEasy. All rights reserved.</footer>;
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        {/* Put Header outside of Routes to show it on every page */}
        <Header />

        {/* Define routes for different pages */}
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={(
              <>
                <Service />
                <Features />
              </>
            )}
          />

          {/* Profile Page Route */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/makeOrder" element={<MakeOrderPage />} />
          <Route path="/trackOrder" element={<TrackOrderPage />} />
          <Route path="/orderHistory" element={<OrderHistoryPage />} />
        </Routes>

        {/* Footer outside of Routes to show it on every page */}
        <Footer />
      </div>
    </Router>
  );
}

const footerStyle = {
  backgroundColor: "#333",
  color: "white",
  textAlign: "center",
  padding: "1rem",
  position: "fixed",
  width: "100%",
  bottom: 0,
};

export default App;
