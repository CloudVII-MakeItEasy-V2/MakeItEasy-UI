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
        const response = await fetch(`http://34.86.154.165:8000/seller/${sellerId}`);
        if (response.ok) {
          const data = await response.json();
          setSellerInfo(data); // Update state with seller info
        } else {
          console.error('Failed to fetch seller info');
          alert(`Failed to fetch seller information. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching seller info:', error);
        alert('An error occurred while fetching seller information.');
      }
    };

    fetchSellerInfo();
  }, [navigate]);

  if (!sellerInfo) {
    console.log('SellerInfo state is:', sellerInfo);
    console.log('LocalStorage sellerId is:', localStorage.getItem('sellerId'));
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
        <div>
          <strong>Name:</strong>
          <div>{sellerInfo.name}</div>
        </div>
        <div>
          <strong>Email:</strong>
          <div>{sellerInfo.email}</div>
        </div>
        <div>
          <strong>Address:</strong>
          <div>{sellerInfo.address || 'Not provided'}</div>
        </div>
        <div>
          <strong>Phone:</strong>
          <div>{sellerInfo.phone_number || 'Not provided'}</div>
        </div>
        <div>
          <strong>Balance:</strong>
          <div>{sellerInfo.balance !== null ? `$${sellerInfo.balance}` : 'Not provided'}</div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Account;
