import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerLogin.css';

const SellerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:5001/sellers?username=${username}&password=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        localStorage.setItem('sellerId', data[0].id);
        navigate('/SellerService');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-page">
      {/* Navbar */}
      <div className="navbar">Seller Login</div>

      {/* Login Form */}
      <div className="login-container">
        <h2>Seller Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>

      {/* Footer */}
      <footer className="footerStyle">© 2024 MakeItEasy. All rights reserved.</footer>
    </div>
  );
};

export default SellerLogin;
