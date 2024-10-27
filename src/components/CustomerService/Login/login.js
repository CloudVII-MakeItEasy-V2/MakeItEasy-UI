import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    try {
      const response = await axios.post('https://your-backend-api.com/api/login', {
        username: username,
        password: password
      });
      if (response.status === 200) {
        // Assuming the API sends back a 200 OK status on successful login
        console.log('Login successful:', response.data);
        navigate('/CustomerService');
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // Updated part of Login.js

return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;