import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";

// Reuse Header from the Login component
const Header = () => (
  <header className="header">
    <div className="logo">Welcome to Your Profile Page!</div>
  </header>
);

// Reuse Footer from the Login component
const Footer = () => (
  <footer className="footer">© 2024 MakeItEasy. All rights reserved.</footer>
);

// Function to fetch customer profile from the API Gateway
const fetchCustomerProfile = async (customerId) => {
  try {
    const token = localStorage.getItem("authToken");
    const grants = localStorage.getItem("grants");

    if (!token || !grants) {
      throw new Error("Authentication token or grants are missing. Please log in again.");
    }

    const headers = {
      Authorization: `${token}`,
      "X-Grants": grants,
      "Content-Type": "application/json",
    };

    console.log("Request Headers:", headers);

    const response = await axios.get(`https://makeiteasy-440104.ue.r.appspot.com/customer/${customerId}`, { headers });

    console.log("Customer Profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer profile:", error);

    // Provide more detailed error messages
    if (error.response) {
      console.error("Server Response:", error.response.data);
      throw new Error(error.response.data.error || "Failed to fetch customer profile.");
    }

    throw error;
  }
};

function ProfilePage() {
  const [customer, setCustomer] = useState(null); // Holds the customer data
  const [loading, setLoading] = useState(true); // Indicates loading state
  const [error, setError] = useState(null); // Holds any error messages

  useEffect(() => {
    // Retrieve customer ID from local storage
    const customerId = localStorage.getItem("customerId");

    // If no customer ID is found, set an error
    if (!customerId) {
      setError("No customer ID found in local storage. Please log in again.");
      setLoading(false);
      return;
    }

    const loadCustomerProfile = async () => {
      try {
        setLoading(true); // Start loading
        const customerData = await fetchCustomerProfile(customerId); // Fetch customer data
        setCustomer(customerData); // Set customer data in state
      } catch (err) {
        // Handle errors, including token issues or server problems
        if (err.response && err.response.status === 401) {
          setError("Unauthorized request. Please log in again.");
        } else {
          setError(
            err.message || "Failed to load customer profile. Please try again later."
          );
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadCustomerProfile(); // Load the customer profile when the component mounts
  }, []);

  // Render the loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="profile-container">
          <p>Loading customer profile...</p>
        </div>
        <Footer />
      </>
    );
  }

  // Render the error state
  if (error) {
    return (
      <>
        <Header />
        <div className="profile-container">
          <p className="error">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  // Render when no customer data is available
  if (!customer) {
    return (
      <>
        <Header />
        <div className="profile-container">
          <p>No customer data available.</p>
        </div>
        <Footer />
      </>
    );
  }

  // Render the profile page with customer details
  return (
    <>
      <Header />
      <div className="profile-container">
        <h1>Customer Profile</h1>
        <div className="profile-details">
          <p>
            <strong>Customer ID:</strong> {customer.customerId}
          </p>
          <p>
            <strong>Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Address:</strong> {customer.address}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>
          <p>
            <strong>Balance:</strong> ${customer.balance}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;