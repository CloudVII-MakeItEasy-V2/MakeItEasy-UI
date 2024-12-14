import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SellerLogin.css';

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to the server
      const response = await fetch('http://34.86.154.165:8000/seller/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('sellerId', data.seller_id); // Save seller_id in localStorage
        navigate('/SellerService'); // Redirect to SellerService
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const Header = () => (
    <header className="header">
      <div className="logo">Welcome! Please Log In First.</div>
    </header>
  );

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <h2>Seller Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {/* New Register Button */}
        <div>
          Not a customer yet? <Link to="/SellerRegister">Click here to register!</Link>
        </div>
      </div>
      <footer className="footerStyle">© 2024 MakeItEasy. All rights reserved.</footer>
    </div>
  );
};

export default SellerLogin;
