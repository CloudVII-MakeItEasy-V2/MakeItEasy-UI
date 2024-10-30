import React, { useState } from 'react';
import axios from 'axios';
import './registerCustomer.css'; // Ensure the CSS path is correct

const Register = () => {
    // State for each input field
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    // Handle the form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            name,
            email,
            address,
            phone,
            password
        };
    
        // Log the data to be sent
        console.log('Sending data:', userData);
    
        if (!name || !email || !address || !phone || !password) {
            alert('All fields are required!');
            return;
        }
    
        try {
            const response = await axios.post('https://makeiteasy-440104.ue.r.appspot.com/customer', JSON.stringify(userData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Registration successful:', response.data);
            alert('Registration successful!');
        } catch (error) {
            console.error('Registration failed:', error);
            // Log and alert the detailed server response error message
            console.log(error.response?.data?.error);
            alert('Registration failed: ' + (error.response?.data?.error || error.message || 'Unknown error'));
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;