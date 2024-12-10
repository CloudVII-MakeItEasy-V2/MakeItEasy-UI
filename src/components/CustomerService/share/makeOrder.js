import React, { useState, useEffect } from "react";
import "./makeOrder.css";
import SearchBox from "./searchBox";
import CartBar from "./cartBar";
import RecommendationList from "./recommendationList";

const products = [
  { id: 1, name: "Wireless Mouse", price: 25.0, stock: 130 },
  { id: 2, name: "Bluetooth Keyboard", price: 45.0, stock: 100 },
  { id: 3, name: "Smartphone Case", price: 15.99, stock: 200 },
  { id: 4, name: "Laptop Sleeve", price: 29.99, stock: 75 },
  { id: 5, name: "Gaming Headset", price: 89.99, stock: 50 },
  { id: 6, name: "USB-C Charger", price: 20.0, stock: 300 },
  { id: 7, name: "Graphic T-Shirt", price: 18.0, stock: 250 },
  { id: 8, name: "Hoodie", price: 35.0, stock: 150 },
  { id: 9, name: "Yoga Mat", price: 25.99, stock: 120 },
  { id: 10, name: "Dumbbell Set", price: 75.0, stock: 80 },
  { id: 11, name: "Coffee Mug", price: 10.99, stock: 500 },
  { id: 12, name: "Blender", price: 49.99, stock: 60 },
  { id: 13, name: "Notebook", price: 5.99, stock: 300 },
  { id: 14, name: "Ballpoint Pens", price: 12.99, stock: 250 },
  { id: 15, name: "Fiction Novel", price: 12.0, stock: 200 },
  { id: 16, name: "Cookbook", price: 25.0, stock: 150 },
  { id: 17, name: "LED Desk Lamp", price: 30.0, stock: 90 },
  { id: 18, name: "Office Chair", price: 120.0, stock: 40 },
  { id: 19, name: "Sunscreen", price: 8.99, stock: 300 },
  { id: 20, name: "Shampoo", price: 12.99, stock: 250 },
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
        : [...prevCart, { ...item, quantity: currentQuantity + 1 }]
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

    if (!customerId || !token || !grants.includes("create_order")) {
      alert("Missing required data or insufficient permissions. Please log in again.");
      return;
    }

    const orderData = {
      customer_id: parseInt(customerId),
      status: "Pending",
      tracking_number: "",
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch(`http://127.0.0.1:8080/customer/${customerId}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
          "X-Grants": `${grants}`,
        },
        body: JSON.stringify(orderData),
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