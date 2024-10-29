import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Account.css';
import Navbar from '../../Navbar'; // Adjust the path as necessary
import Footer from '../../Footer'; // Adjust the path as necessary

const Account = () => {
  const navigate = useNavigate();
  const [sellerInfo, setSellerInfo] = useState(null);

  useEffect(() => {
    const fetchSellerInfo = async () => {
      const sellerId = localStorage.getItem('sellerId'); // Retrieve the seller ID from localStorage
      if (!sellerId) {
        alert('No seller logged in');
        navigate('/SellerLogin');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/sellers/${sellerId}`);
        if (response.ok) {
          const data = await response.json();
          setSellerInfo(data);
        } else {
          console.error('Failed to fetch seller info');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSellerInfo();
  }, [navigate]);

  if (!sellerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-page">
      {/* Navbar */}
      <Navbar />

      {/* Account Info */}
      <div className="account-container">
        <button onClick={() => navigate('/SellerService')} className="back-button">
          Home
        </button>
        <h1>Seller Profile</h1>
        <p><strong>Seller ID:</strong> {sellerInfo.id}</p>
        <p><strong>Name:</strong> {sellerInfo.name}</p>
        <p><strong>Email:</strong> {sellerInfo.email}</p>
        <p><strong>Address:</strong> {sellerInfo.address || 'Not provided'}</p>
        <p><strong>Phone:</strong> {sellerInfo.phone || 'Not provided'}</p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Account;
