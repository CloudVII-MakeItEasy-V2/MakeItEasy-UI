// src/components/Seller/Orders/trackOrder.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Orders.css';

const Orders = () => {
  const navigate = useNavigate();

  // Dummy data for the orders table
  const [orders, setOrders] = useState([
    {
      orderNumber: '12345',
      purchaser: 'John Doe',
      itemOrdered: 'Laptop',
      quantity: 1,
      timeOrdered: '2024-09-20 12:30:00',
      amount: '$1200',
      status: 'Shipped',
      shippedTo: 'New York, USA',
    },
    {
      orderNumber: '67890',
      purchaser: 'Jane Smith',
      itemOrdered: 'Smartphone',
      quantity: 2,
      timeOrdered: '2024-09-22 15:45:00',
      amount: '$1600',
      status: 'Processing',
      shippedTo: 'Los Angeles, USA',
    },
  ]);

  // Handle edit and delete buttons (you can add functionality later)
  const handleEdit = (orderNumber) => {
    console.log(`Edit order: ${orderNumber}`);
  };

  const handleDelete = (orderNumber) => {
    setOrders(orders.filter((order) => order.orderNumber !== orderNumber));
  };

  return (
    <div className="orders-container">
      <div className="left">
        <button onClick={() => navigate('/')} className="back-button">
          Home
        </button>
      </div>
      <div className="center">
      <h1>Orders History</h1>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Purchaser</th>
            <th>Item Ordered</th>
            <th>Quantity</th>
            <th>Time Ordered</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Shipped To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderNumber}>
              <td>{order.orderNumber}</td>
              <td>{order.purchaser}</td>
              <td>{order.itemOrdered}</td>
              <td>{order.quantity}</td>
              <td>{order.timeOrdered}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
              <td>{order.shippedTo}</td>
              <td>
                <button onClick={() => handleEdit(order.orderNumber) } className="edit-button">Edit</button>
                <button onClick={() => handleDelete(order.orderNumber)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Orders;
