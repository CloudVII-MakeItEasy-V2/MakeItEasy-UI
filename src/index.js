import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomerService from './customerService';
//import SellerService from './sellerService';
import reportWebVitals from './reportWebVitals';

function Header() {
  return (
  <header className="header">
  <div className="logo">Welcome! Please Log In First.</div>
  </header>
  );
  }

function Footer() {
  return <footer className="footerStyle">© 2024 MakeItEasy. All rights reserved.</footer>;
}

function LandingPage() {
  const [view, setView] = useState(null);

  const handleCustomerClick = () => setView('customer');
  const handleSellerClick = () => setView('seller');

  if (view === 'customer') {
    return <CustomerService />;
  } else if (view === 'seller') {
    // change this to SellerService component
    return <CustomerService />;
  }
  // default landing page
  return (
    <div className="landing-page">
      <Header />
      <button className="btn" onClick={handleCustomerClick}>
        Log In as Customer
      </button>
      <button className="btn" onClick={handleSellerClick}>
        Log In as Seller
      </button>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);

// Report web vitals (optional performance tracking)
reportWebVitals(console.log);
