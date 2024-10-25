// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/Landing';  // Adjusted path
import CustomerService from './components/CustomerService/customerService';  // Adjusted path
import SellerService from './components/SellerService/sellerService'; // Adjusted path
import Seller from './components/SellerService/Seller/Seller'; 

import Orders from './components/SellerService/Seller/Orders/trackOrder'; // Adjusted path for Orders
import ManageProduct from './components/SellerService/Seller/Product/manageProduct'; // Adjusted path for ManageProduct
import Account from './components/SellerService/Seller/Account/account'; // Adjusted path for Account

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Customer Service Page */}
        <Route path="/CustomerService" element={<CustomerService />} />

        {/* Seller Service Page and Subpages */}
        <Route path="/SellerService" element={<SellerService />} />
        <Route path="/SellerService/orders" element={<Orders />} />
        <Route path="/SellerService/product" element={<ManageProduct />} />
        <Route path="/SellerService/profile" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
