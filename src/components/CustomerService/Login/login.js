import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userData = { email, password };
    try {
      const response = await axios.post('https://makeiteasy-440104.ue.r.appspot.com/customer/login', userData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.state) {
        console.log('Login successful:', response.data);
        // Extract customer_id from the profile link
        const profileLink = response.data.links.find(link => link.rel === 'profile').href;
        const customerId = profileLink.split('/').pop(); // Assuming URL is in format /customer/{customer_id}
        
        // Store customer_id in local storage or state
        localStorage.setItem('customerId', customerId); // Using local storage for simplicity
  
        // Navigate to Customer Service page
        navigate('/CustomerService');
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p className="register-link">
          Not a customer yet? <Link to="/RegisterCustomer">Click here to register!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;