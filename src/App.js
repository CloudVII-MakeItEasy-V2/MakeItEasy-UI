// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/Landing'; 

import CustomerService from './components/CustomerService/customerService';  

import SellerService from './components/SellerService/sellerService';

import SellerOrders from './components/SellerService/components/Seller/Orders/trackOrder'; // Adjusted path for Orders
import SellerManageProduct from './components/SellerService/components/Seller/Product/manageProduct'; // Adjusted path for ManageProduct
import SellerAccount from './components/SellerService/components/Seller/Account/account'; // Adjusted path for Account

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
        <Route path="/SellerOrders" element={<SellerOrders />} />
        <Route path="/SellerProduct" element={<SellerManageProduct />} />
        <Route path="/SellerProfile" element={<SellerAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
