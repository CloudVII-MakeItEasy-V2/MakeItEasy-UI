// src/components/CustomerService/customer.js
import React from "react";
import "./customerService.css";
import { useNavigate } from "react-router-dom";

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
    navigate("/CustomerProfile"); // Navigate to the profile page
  };

  return (
    <button className="profile-btn" onClick={handleClick}>
      P
    </button>
  );
}

// Ticket Button Component
function TicketButton() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleClick = () => {
    navigate("/CustomerTicket"); // Navigate to the ticket page
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
    navigate("/CustomerMakeOrder"); // Navigate to the make order page
  };
  const toTrackOrder = () => {
    navigate("/CustomerTrackOrder"); // Navigate to the track order page
  };
  const toOrderHistory = () => {
    navigate("/CustomerOrderHistory"); // Navigate to the order history page
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
  return <footer className="footerStyle">© 2024 MakeItEasy. All rights reserved.</footer>;
}

// Main Component (without Router)
function CustomerService() {
  return (
    <div className="customerService-container">
      {/* Header to show on every page */}
      <Header />

      {/* Main content of the Customer Service */}
      <Service />
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CustomerService;
