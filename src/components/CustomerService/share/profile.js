import React, { useEffect, useState } from "react";
import "./profile.css";

const fetchCustomerProfile = async (customerId) => {
//const response = await fetch(/api/customers/${customerId});
//const data = await response.json();
const data = {
"customer_id": "1234567",
"name": "A nice Customer",
"email": "anicecustomer@aniceemail.com",
"address": "123 W 456th St",
"phone": "+1-111-222-3333",
"orders": [
{
"id": 1001,
"date": "2024-09-15T14:30:00Z",
"total": 250.75,
"status": "Delivered"
},
{
"id": 1002,
"date": "2024-08-22T10:25:00Z",
"total": 89.99,
"status": "Shipped"
},
],
"support_tickets": [
{
"id": 2001,
"subject": "Issue with Order #1001",
"status": "Resolved"
},
{
"id": 2002,
"subject": "Inquiry about return policy",
"status": "Open"
}
]
}
return data;
};

function ProfilePage() {
const [customer, setCustomer] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
// hard-coded data for temporary use
const customerId = "1234567";
useEffect(() => {
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
}, [customerId]);

if (loading) {
return <p>Loading customer profile...</p>;
}

if (error) {
return <p className="error">{error}</p>;
}

if (!customer) {
// replace this with creating profile function later
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

  <h2>Orders</h2>
  {customer.orders.length === 0 ? (
    <p>No orders found.</p>
  ) : (
    <ul className="order-list">
      {customer.orders.map((order) => (
        <li key={order.id}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ${order.total}</p>
        </li>
      ))}
    </ul>
  )}

  <h2>Support Tickets</h2>
  {customer.support_tickets.length === 0 ? (
    <p>No support tickets found.</p>
  ) : (
    <button
      className="support-tickets-button"
      // support tickets viewing function will be implemented later
      onClick={() => alert("Support tickets will be shown here.")}
    >
      View Support Tickets
    </button>
  )}
</div>
);
}

export default ProfilePage;