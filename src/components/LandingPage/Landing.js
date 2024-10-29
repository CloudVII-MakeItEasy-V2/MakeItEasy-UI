// src/components/LandingPage/Landing.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSellerLogin = () => {
    navigate('/SellerLogin');
  };

  const Header = () => (
    <header className="header">
      <div className="logo">Welcome! Please Log In First.</div>
    </header>
  );

  const Footer = () => (
    <footer className="footerStyle">© 2024 MakeItEasy. All rights reserved.</footer>
  );

  return (
    <div className="landing-page">
      <Header />
      <div>
        <button onClick={handleSellerLogin}className="btn">
          Log In as Seller
        </button>
        <button className="btn" onClick={() => navigate('/CustomerService')}>
          Log In as Customer
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
