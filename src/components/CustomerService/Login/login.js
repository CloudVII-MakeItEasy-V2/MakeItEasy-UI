import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const Header = () => (
    <header className="header">
      <div className="logo">Welcome! Please Log In First.</div>
    </header>
  );

  const Footer = () => (
    <footer className="footer">© 2024 MakeItEasy. All rights reserved.</footer>
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    const userData = { email, password };
    console.log('Payload being sent:', userData); // Debugging payload
  
    try {
      // Send POST request to the login endpoint
      const response = await axios.post(
        'https://makeiteasy-440104.ue.r.appspot.com/customer/login',
        userData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      console.log('Login successful:', response.data);
  
      // Extract data and headers
      const customerId = response.data.customer.customerId; // Assuming the response contains customerId in the "customer" object
      const authToken = response.headers['authorization']; // Remove "Bearer " prefix
      const grants = response.headers['x-grants']?.split(','); // Split grants into an array
  
      // Store the extracted values in localStorage
      if (customerId) localStorage.setItem('customerId', customerId);
      if (authToken) localStorage.setItem('authToken', authToken);
      if (grants) localStorage.setItem('grants', JSON.stringify(grants));
      console.log(authToken);
      console.log(grants);
      console.log(customerId);
  
      // Navigate to the Customer Service page
      navigate('/CustomerService');
    } catch (error) {
      console.error('Full error response:', error.response); // Debug full error
      alert(
        'Login failed: ' +
          (error.response?.data?.message || 'Unknown error. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
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
            Not a customer yet?{' '}
            <Link to="/RegisterCustomer">Click here to register!</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;