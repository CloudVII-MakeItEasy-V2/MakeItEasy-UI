// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/Landing'; 
import CustomerService from './components/CustomerService/customerService';  
import ProfilePage from "./components/CustomerService/share/profile";
import TicketPage from "./components/CustomerService/share/ticket";
import MakeOrderPage from "./components/CustomerService/share/makeOrder";
import TrackOrderPage from "./components/CustomerService/share/trackOrder";
import OrderHistoryPage from "./components/CustomerService/share/orderHistory";

import SellerService from './components/SellerService/sellerService';

import Orders from './components/SellerService/components/Seller/Orders/trackOrder'; // Adjusted path for Orders
import ManageProduct from './components/SellerService/components/Seller/Product/manageProduct'; // Adjusted path for ManageProduct
import Account from './components/SellerService/components/Seller/Account/account'; // Adjusted path for Account

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/CustomerProfile" element={<ProfilePage />} />
        <Route path="/CustomerTicket" element={<TicketPage />} />
        <Route path="/CustomerMakeOrder" element={<MakeOrderPage />} />
        <Route path="/CustomerTrackOrder" element={<TrackOrderPage />} />
        <Route path="/CustomerOrderHistory" element={<OrderHistoryPage />} />
        {/* Customer Service Page */}
        <Route path="/CustomerService" element={<CustomerService />} />

        {/* Seller Service Page and Subpages */}
        <Route path="/SellerService" element={<SellerService />} />
        <Route path="/SellerOrders" element={<Orders />} />
        <Route path="/SellerProduct" element={<ManageProduct />} />
        <Route path="/SellerProfile" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;