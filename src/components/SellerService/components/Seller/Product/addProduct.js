import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/addProduct.css'; // Adjust the path as necessary
import Navbar from '../../Navbar'; // Adjust the path as necessary
import Footer from '../../Footer'; // Adjust the path as necessary

const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category: '',
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Retrieve seller_id from localStorage
    const sellerId = localStorage.getItem('sellerId');

    if (!sellerId) {
      alert('No seller logged in. Please log in first.');
      navigate('/SellerLogin');
      return;
    }

    // Prepare the payload
    const payload = {
      seller_id: parseInt(sellerId, 10), // Ensure it's an integer
      name: productData.name,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock, 10),
      description: productData.description,
      category: productData.category,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 201) {
        setSuccess('Product added successfully!');
        // Optionally, redirect to the manage products page
        // navigate('/manageproduct');
        // Or clear the form
        setProductData({
          name: '',
          price: '',
          stock: '',
          description: '',
          category: '',
        });
      } else {
        setError(result.error || 'Failed to add product.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="add-product-page">
      {/* Navbar */}
      <Navbar />

      {/* Add Product Form */}
      <div className="add-product-container">
      <div>
        <button onClick={() => navigate('/SellerProduct')} className="back-button">
          BACK
        </button>
      </div>
      <div className= "title"> <h1> Add New Product</h1></div>
        

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name<span className="required">*</span>:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)<span className="required">*</span>:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
              step="0.01"
              placeholder="Enter product price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock<span className="required">*</span>:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              required
              placeholder="Enter stock quantity"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              placeholder="Enter product category"
            />
          </div>

          <button type="submit" className="submit-button">
            Add Product
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddProduct;
