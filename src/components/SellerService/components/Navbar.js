// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Welcome, Seller</h2> {/* The header on the left */}
      </div>
      <div className="navbar-right">
        <Link to="/SellerProfile" className="navbar-link">Profile</Link> {/* The Profile link on the right */}
      </div>
    </nav>
  );
};

export default Navbar;
