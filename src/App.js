// src/App.js

import React from 'react';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Seller from './components/Seller/Seller';
import Account from './components/Seller/Account/account';
import Orders from './components/Seller/Orders/trackOrder';
import ManageProduct from './components/Seller/Product/manageProduct';
import Footer from './components/Footer';
import Navbar from './components/Navbar'; // Import the Navbar component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Add the Navbar at the top */}
        <Routes>
          <Route path="/" element={<Seller />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product" element={<ManageProduct />} />
          {/* Add a route for Profile */}
          <Route path="/profile" element={<Account />} />
        </Routes>
        <Footer /> {/* Footer remains at the bottom */}
      </div>
    </Router>
  );
}

export default App;
