import React, { useState, useEffect } from "react";
import "./makeOrder.css";
import SearchBox from "./searchBox";
import CartBar from "./cartBar";
import RecommendationList from "./recommendationList";

// Hardcoded product data
const products = [
  { id: 201, name: "Wireless Mouse", price: 25.0, stock: 130 },
  { id: 202, name: "Bluetooth Keyboard", price: 45.0, stock: 100 },
  { id: 203, name: "Smartphone Case", price: 15.99, stock: 200 },
  { id: 204, name: "Laptop Sleeve", price: 29.99, stock: 75 },
  { id: 205, name: "Gaming Headset", price: 89.99, stock: 50 },
  { id: 206, name: "USB-C Charger", price: 20.0, stock: 300 },
  { id: 207, name: "Graphic T-Shirt", price: 18.0, stock: 250 },
  { id: 208, name: "Hoodie", price: 35.0, stock: 150 },
  { id: 209, name: "Yoga Mat", price: 25.99, stock: 120 },
  { id: 210, name: "Dumbbell Set", price: 75.0, stock: 80 },
  { id: 211, name: "Coffee Mug", price: 10.99, stock: 500 },
  { id: 212, name: "Blender", price: 49.99, stock: 60 },
  { id: 213, name: "Notebook", price: 5.99, stock: 300 },
  { id: 214, name: "Ballpoint Pens", price: 12.99, stock: 250 },
  { id: 215, name: "Fiction Novel", price: 12.0, stock: 200 },
  { id: 216, name: "Cookbook", price: 25.0, stock: 150 },
  { id: 217, name: "LED Desk Lamp", price: 30.0, stock: 90 },
  { id: 218, name: "Office Chair", price: 120.0, stock: 40 },
  { id: 219, name: "Sunscreen", price: 8.99, stock: 300 },
  { id: 220, name: "Shampoo", price: 12.99, stock: 250 },
];

const recommendations = products.slice(0, 5);

// Header Component
const Header = () => (
  <header className="header">
    <div className="logo">Welcome to the Make Order Page</div>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="footer">© 2024 MakeItEasy. All rights reserved.</footer>
);

function MakeOrderPage() {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Use hardcoded recommendations
    setRecommendedItems(recommendations);
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const filteredItems = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredItems);
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (currentQuantity + 1 > item.stock) {
      alert(`Cannot add more of ${item.name}. Stock limit reached!`);
      return;
    }

    setCartItems((prevCart) =>
      existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: 1 }]
    );
    setTotalPrice((prevTotal) => prevTotal + item.price);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty! Add some items before checkout.");
      return;
    }

    const customerId = localStorage.getItem("customerId");
    const token = localStorage.getItem("authToken");
    const grants = localStorage.getItem("grants");

    if (!customerId || !token || !grants || !grants.includes("create_order")) {
      alert(
        "Missing required data or insufficient permissions. Please log in again."
      );
      return;
    }

    const orderData = {
      status: "Pending", // Default value for status
      tracking_number: "", // Default empty tracking number
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price, // Include the price for each item
      })),
    };

    console.log("Order Data:", orderData);

    try {
      // API Gateway endpoint (replace with your actual endpoint)
      const apiGatewayEndpoint = `http://127.0.0.1:8080/customer/${customerId}/orders`;

      const response = await fetch(apiGatewayEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Pass the token for authentication
          "X-Grants": grants, // Include grants header
        },
        body: JSON.stringify(orderData), // Send the correctly formatted payload
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order created successfully:", data);
        alert(`Order created successfully! Order ID: ${data.order_id}`);
        setCartItems([]); // Clear the cart after successful checkout
        setTotalPrice(0); // Reset the total price
      } else {
        const errorDetails = await response.json();
        console.error("Order creation failed:", errorDetails);
        alert(`Order creation failed: ${errorDetails.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred while creating the order. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="makeOrder-container">
        <h1>Make an Order</h1>
        <SearchBox onSearch={handleSearch} />
        <RecommendationList
          items={searchResults.length > 0 ? searchResults : recommendedItems}
          onAddToCart={handleAddToCart}
        />
        <CartBar cartItems={cartItems} totalPrice={totalPrice} />
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default MakeOrderPage;