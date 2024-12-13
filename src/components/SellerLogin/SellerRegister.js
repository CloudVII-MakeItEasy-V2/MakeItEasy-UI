import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerRegister.css';

const SellerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validation: Ensure all fields are filled
    if (!name || !email || !passwordHash) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Attempting to register seller with:", { name, email, passwordHash });

    try {
      // Send POST request to the backend
      const response = await fetch('http://127.0.0.1:8000/seller/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name, 
          email: email, 
          password_hash: passwordHash 
        })
      });

      console.log("Response status:", response.status);

      let data = {};
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
      }

      console.log("Response data:", data);

      if (response.status === 201 || response.status === 200) { // Adjust status codes as needed
        console.log("Registration successful:", data);
        setIsRegistered(true);
      } else {
        const errorMessage = data.error || response.statusText || 'Unknown error occurred.';
        alert(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Check console for details.');
    }
  };

  const goBackToLogin = () => {
    navigate('/SellerLogin');
  };

  return (
    <div className="register-page">
      <div className="navbar">Seller Registration</div>
      <div className="register-container">
        {isRegistered ? (
          <div className="success-message">
            <h2>Registration Successful!</h2>
            <p>You have successfully registered as a new seller.</p>
            <button  className = "successbutton" onClick={goBackToLogin}>Go Back to Login</button>
          </div>
        ) : (
          <>
            <h2 className="pink">Register as a New Seller</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              className="input-field"
              onChange={(e) => {
                console.log("Name input changed:", e.target.value);
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="input-field"
              onChange={(e) => {
                console.log("Email input changed:", e.target.value);
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordHash}
              className="input-fieldPassword"
              onChange={(e) => {
                console.log("Password input changed:", e.target.value);
                setPasswordHash(e.target.value);
              }}
            />
            <button onClick={handleRegister} className="register-button">Register</button>
          </>
        )}
      </div>
      <footer className="footerStyle">© 2024 MakeItEasy. All rights reserved.</footer>
    </div>
  );
};

export default SellerRegister;
