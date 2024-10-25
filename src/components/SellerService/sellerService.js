// src/components/SellerService/seller.js
import React from 'react';
import './Styles/App.css';
import Seller from './components/Seller/Seller';

import Footer from './components/Footer';
import Navbar from './components/Navbar'; // Import the Navbar component

function SellerService() {
  return (
    <div className="App">
      <Navbar /> {/* Add the Navbar at the top */}
      <Seller /> {/* The default content for the SellerService page */}
      <Footer /> {/* Footer remains at the bottom */}
    </div>
  );
}

export default SellerService;
