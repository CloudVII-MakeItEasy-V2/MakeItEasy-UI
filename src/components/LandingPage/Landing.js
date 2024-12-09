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
    <footer className="footer">
      © 2024 MakeItEasy. All rights reserved.
    </footer>
  );

  return (
    <>
      <Header />
      <div className="landing-container">
        <main className="main-content">
          <button onClick={handleSellerLogin} className="btn">
            Log In as Seller
          </button>
          <button className="btn" onClick={() => navigate('/CustomerLogin')}>
            Log In as Customer
          </button>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;