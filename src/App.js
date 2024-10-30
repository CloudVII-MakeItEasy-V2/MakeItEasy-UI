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
import SellerLogin from './components/SellerLogin/SellerLogin';
import CustomerLogin from "./components/CustomerService/Login/login"
import RegisterCustomer from './components/CustomerService/Login/registerCustomer'
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
        <Route path="/CustomerProfile" element={<ProfilePage />} />
        <Route path="/CustomerTicket" element={<TicketPage />} />
        <Route path="/CustomerMakeOrder" element={<MakeOrderPage />} />
        <Route path="/CustomerTrackOrder" element={<TrackOrderPage />} />
        <Route path="/CustomerOrderHistory" element={<OrderHistoryPage />} />
        {/* Customer Service Page */}
        <Route path="/CustomerService" element={<CustomerService />} />
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
        <Route path="/RegisterCustomer" element={<RegisterCustomer />}/>
        {/* Seller Service Page and Subpages */}
        <Route path="/SellerLogin" element={<SellerLogin />} />
        <Route path="/SellerService" element={<SellerService />} />
        <Route path="/SellerOrders" element={<SellerOrders />} />
        <Route path="/SellerProduct" element={<SellerManageProduct />} />
        <Route path="/SellerProfile" element={<SellerAccount />} />
      </Routes>
    </Router>
  );
}

export default App;