import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./profile.css";

const fetchCustomerProfile = async (customerId) => {
  try {
    const response = await axios.get(`http://localhost:8080/customer/${customerId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

function ProfilePage() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const customerId = localStorage.getItem('customerId'); // Retrieve customer ID from local storage
    if (!customerId) {
      setError("No customer ID found.");
      setLoading(false);
      return;
    }

    const loadCustomerProfile = async () => {
      try {
        setLoading(true);
        const customerData = await fetchCustomerProfile(customerId);
        setCustomer(customerData);
      } catch (err) {
        setError("Failed to load customer profile.");
      } finally {
        setLoading(false);
      }
    };

    loadCustomerProfile();
  }, []);

  if (loading) {
    return <p>Loading customer profile...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!customer) {
    return <p>No customer data available.</p>;
  }

  return (
    <div className="profile-container">
      <h1>Customer Profile</h1>
      <div className="profile-details">
        <p><strong>Customer ID:</strong> {customer.customer_id}</p>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Address:</strong> {customer.address}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
      </div>
      {/* Further implementation details */}
    </div>
  );
}

export default ProfilePage;