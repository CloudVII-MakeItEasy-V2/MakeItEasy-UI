// src/components/Seller/Product/manageProduct.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import '../../../Styles/Product.css'; // Uncomment when you add styling

const ManageProduct = () => {
  const navigate = useNavigate();

  // Dummy product data
  const [products, setProducts] = useState([
    {
      productName: 'Laptop',
      productNumber: 'P12345',
      summary: 'High-performance laptop for professionals',
      price: '$1200',
      quantity: 10,
    },
    {
      productName: 'Smartphone',
      productNumber: 'P67890',
      summary: 'Latest smartphone with high-end specs',
      price: '$800',
      quantity: 20,
    },
  ]);

  // Handle edit and delete actions
  const handleEdit = (productNumber) => {
    console.log(`Edit product: ${productNumber}`);
    // Future functionality for editing the product
  };

  const handleDelete = (productNumber) => {
    setProducts(products.filter((product) => product.productNumber !== productNumber));
  };

  return (
    <div className="product-container">
      <div className="left">
      <button onClick={() => navigate('/')} className="back-button">
        Home
      </button>
      </div>
      <h1>Manage Products</h1>
      <button className="add-button" onClick={() => {
        // Add a new random product (just for demo purposes)
        const newProduct = {
          productName: 'New Product',
          productNumber: `P${Math.floor(Math.random() * 100000)}`,
          summary: 'Newly added product',
          price: '$500',
          quantity: 15,
        };
        setProducts([...products, newProduct]);
      }}>
        Add Product
      </button>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Number</th>
            <th>Summary</th>
            <th>Price</th>
            <th>Quantity on Hand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productNumber}>
              <td>{product.productName}</td>
              <td>{product.productNumber}</td>
              <td>{product.summary}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleEdit(product.productNumber)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(product.productNumber)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ManageProduct;
