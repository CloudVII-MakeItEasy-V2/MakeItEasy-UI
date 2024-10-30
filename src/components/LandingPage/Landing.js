// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';


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

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Header />
      <div>
      <button className="btn" onClick={() => navigate('/SellerService')}>
      Log In as Seller
        </button>
        <button className="btn" onClick={() => navigate('/CustomerLogin')}>
      Log In as Customer
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
