import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Product.css'; // Ensure this path is correct
import Navbar from '../../Navbar'; // Adjust the path as necessary
import Footer from '../../Footer'; // Adjust the path as necessary

const ManageProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage] = useState(1);
  const [itemsPerPage] = useState(100);

  const sellerId = localStorage.getItem('sellerId');

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/seller/${sellerId}/products`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const mappedProducts = data.products.map((product) => ({
        productName: product.name || 'N/A',
        productNumber: `P${product.product_id}`,
        summary: product.description || 'No description provided.',
        price: `$${product.price.toFixed(2)}`,
        quantity: product.stock,
        productId: product.product_id,
      }));

      setProducts(mappedProducts);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [sellerId]);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/product/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product.productId !== productId));
        alert('Product deleted successfully.');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete the product.');
      }
    } catch (err) {
      alert(`Error deleting product: ${err.message}`);
    }
  };

  const handleEdit = async (productId) => {
    const product = products.find((p) => p.productId === productId);

    if (!product) {
      alert('Product not found.');
      return;
    }

    const finalQuantity = prompt(
      `Enter the final quantity for product ${product.productName} (Current: ${product.quantity}):`
    );

    if (finalQuantity === null) return; // User cancelled the prompt

    const parsedQuantity = parseInt(finalQuantity, 10);

    if (isNaN(parsedQuantity)) {
      alert('Invalid quantity. Please enter a valid number.');
      return;
    }

    const quantityDifference = product.quantity - parsedQuantity;

    const payload = {
      items: [
        {
          product_id: productId,
          quantity: quantityDifference,
        },
      ],
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/product/update_stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Stock updated successfully.');
        setProducts((prev) =>
          prev.map((p) =>
            p.productId === productId ? { ...p, quantity: parsedQuantity } : p
          )
        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update stock.');
      }
    } catch (err) {
      alert(`Error updating stock: ${err.message}`);
    }
  };

  const handleAddProduct = () => navigate('/SellerProductAdd');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (!sellerId) {
      alert('No seller logged in. Please log in first.');
      navigate('/SellerLogin');
      return;
    }

    fetchProducts();
  }, [navigate, sellerId, fetchProducts]);

  return (
    <div className="product-container">
      <Navbar />
      <div className="left">
        <button onClick={() => navigate('/SellerService')} className="back-button">
          Back
        </button>
      </div>
      <h1>Manage Products</h1>
      <button className="add-button" onClick={handleAddProduct}>
        Add Product
      </button>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-table-wrapper">
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
          </table>
          <div className="table-body-scroll">
            <table className="product-table">
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productName}</td>
                    <td>{product.productNumber}</td>
                    <td>{product.summary}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <div>  
                      <button onClick={() => handleEdit(product.productId)} className="edit-button">
                        Edit
                      </button>
                      </div>
                      <button onClick={() => handleDelete(product.productId)} className="delete-button">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ManageProduct;
