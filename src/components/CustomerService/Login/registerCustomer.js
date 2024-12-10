import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './registerCustomer.css';

const Register = () => {
    // State for each input field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [balance, setBalance] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize the navigate function

    // Form validation helper
    const validateForm = () => {
        if (!name || !email || !address || !phone || !password || !balance) {
            alert('All fields are required!');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return false;
        }
        const phoneRegex = /^[0-9]{10,15}$/; // Adjust length as needed
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number (only digits, 10-15 characters)!');
            return false;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return false;
        }
        const balanceRegex = /^[0-9]+$/; // Only positive numbers allowed
        if (!balanceRegex.test(balance)) {
            alert('Balance must be a positive number!');
            return false;
        }
        return true;
    };

    // Handle the form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form before proceeding
        if (!validateForm()) return;

        const userData = {
            name,
            email,
            address,
            phone,
            password,
            balance: parseFloat(balance), // Ensure balance is a number
        };

        console.log('Sending data:', userData);
        setLoading(true); // Show loading state

        try {
            const response = await axios.post(
                'https://makeiteasy-440104.ue.r.appspot.com/customer/register',
                JSON.stringify(userData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Registration successful:', response.data);

            // Extract values from the response
            const customerId = response.data.customer.customerId; // Assuming "customerId" is included in the response body
            const token = response.headers['authorization']; // Extract token from headers
            const grants = response.headers['x-grants']; // Extract grants from headers

            if (customerId && token && grants) {
                console.log('Customer ID:', customerId);
                console.log('Token:', token);
                console.log('Grants:', grants);

                // Store values in localStorage
                localStorage.setItem('customerId', customerId);
                localStorage.setItem('authToken', token);
                localStorage.setItem('grants', grants);

                // Redirect to the desired page
                navigate('/CustomerService');
            } else {
                console.error('Missing required values from the server response.');
                alert('Registration successful, but some data is missing.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed: ' + (error.response?.data?.error || error.message || 'Unknown error'));
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <>
            <header className="header">
                <div className="logo">Register for an Account</div>
            </header>

            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="balance">Balance</label>
                        <input
                            type="number"
                            id="balance"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            required
                            min="0"
                            step="1"
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>

            <footer className="footer">
                © 2024 MakeItEasy. All rights reserved.
            </footer>
        </>
    );
};

export default Register;