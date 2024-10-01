import React, { useState, useEffect } from "react";
import "./makeOrder.css";
import SearchBox from "./searchBox";
import CartBar from "./cartBar";
import RecommendationList from "./RecommendationList";
class OrderItem {
  constructor(productId, quantity, price, orderId = null) {
    // orderId is optional, this is because when the item is only in cart but not in an order, it may not have orderId
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }

  calculateTotal() {
    return this.quantity * this.price;
  }
}
class Order {
  constructor(customerId, orderItems, totalAmount) {
    this.orderId = this.generateUniqueId();
    this.customerId = customerId;
    this.orderItems = orderItems;
    this.totalAmount = totalAmount || this.calculateTotalAmount();
    // when an order is just created, the status is pending, waiting to be accepted by the seller
    this.status = "Pending";
    this.createdDate = new Date();
    // tracking number will be obtained when the order has been shipped
    this.trackingNumber = null;
  }

  generateUniqueId() {
    // generate ID randomly
    return Math.floor(Math.random() * 1000000);
  }

  calculateTotalAmount() {
    return this.orderItems.reduce((total, item) => total + item.calculateTotal(), 0);
  }

  updateOrderStatus(newStatus) {
    if (["Pending", "Processing", "Shipped", "Delivered", "Closed", "Cancelled"].includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error("Invalid status");
    }
  }

  getOrderDetails() {
    return {
      orderId: this.orderId,
      customerId: this.customerId,
      orderItems: this.orderItems,
      totalAmount: this.totalAmount,
      status: this.status,
      createdDate: this.createdDate,
      trackingNumber: this.trackingNumber,
    };
  }

  trackOrder() {
    if (this.trackingNumber) {
      return `Tracking number: ${this.trackingNumber}`;
    } else {
      return "Order not shipped yet.";
    }
  }

  cancelOrder() {
    if (this.status === "Pending") {
      this.status = "Cancelled";
    } else {
      throw new Error("Cannot cancel an order that is already processed.");
    }
  }
}
class Payment {
  constructor(orderId, paymentMethod, amount) {
    this.paymentId = this.generateUniqueId();
    this.orderId = orderId;
    this.paymentMethod = paymentMethod;
    this.amount = amount;
    this.status = "Pending";
    this.transactionId = null;
  }

  generateUniqueId() {
    return Math.floor(Math.random() * 1000000);
  }

  processPayment() {
    this.transactionId = `TXN-${Math.floor(Math.random() * 1000000)}`;
    this.status = "Completed";
    console.log(`Payment of ${this.amount} processed using ${this.paymentMethod}`);
  }

  getPaymentStatus() {
    return {
      paymentId: this.paymentId,
      orderId: this.orderId,
      status: this.status,
      transactionId: this.transactionId,
    };
  }

  refundPayment() {
    if (this.status === "Completed") {
      this.status = "Refunded";
      console.log(`Payment refunded. Transaction ID: ${this.transactionId}`);
    } else {
      throw new Error("Cannot refund a non-completed payment.");
    }
  }
}
class Cart {
  constructor(customerId) {
    this.customerId = customerId;
    this.items = [];
    this.totalPrice = 0;
  }

  addItem(productId, quantity, price) {
    const existingItem = this.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;  // Increment quantity if item already exists
    } else {
      const newItem = new OrderItem(productId, quantity, price);
      this.items.push(newItem);
    }
    // update total price
    this.calculateTotalPrice();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    this.calculateTotal();
  }

  calculateTotalPrice() {
    this.totalPrice = this.items.reduce((total, item) => {
      return total + item.calculateTotal();
    }, 0); 
  }

  checkout() {
    if (this.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Create an order from the cart items
    const order = new Order(this.customerId, this.items, this.totalPrice);
    return order;
  }
}
class OrderService {
  constructor() {
    this.orders = [];
    this.payments = [];
  }

  createOrder(customer, orderItems) {
    const totalAmount = orderItems.reduce((total, item) => total + item.calculateTotal(), 0);
    const newOrder = new Order(customer, orderItems, totalAmount);
    this.orders.push(newOrder);
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(order => order.orderId === orderId);
    if (!order) throw new Error("Order not found");
    order.updateOrderStatus(newStatus);
  }

  getOrderDetails(orderId) {
    const order = this.orders.find(order => order.orderId === orderId);
    if (!order) throw new Error("Order not found");
    return order.getOrderDetails();
  }

  trackOrder(orderId) {
    const order = this.orders.find(order => order.orderId === orderId);
    if (!order) throw new Error("Order not found");
    return order.trackOrder();
  }

  cancelOrder(orderId) {
    const order = this.orders.find(order => order.orderId === orderId);
    if (!order) throw new Error("Order not found");
    order.cancelOrder();
  }

  processPayment(orderId, paymentMethod) {
    const order = this.orders.find(order => order.orderId === orderId);
    if (!order) throw new Error("Order not found");

    const payment = new Payment(orderId, paymentMethod, order.totalAmount);
    payment.processPayment();
    this.payments.push(payment);
    return payment;
  }

  getPaymentStatus(paymentId) {
    const payment = this.payments.find(payment => payment.paymentId === paymentId);
    if (!payment) throw new Error("Payment not found");
    return payment.getPaymentStatus();
  }

  refundPayment(paymentId) {
    const payment = this.payments.find(payment => payment.paymentId === paymentId);
    if (!payment) throw new Error("Payment not found");
    payment.refundPayment();
  }
}
// hard-coded data for temporary use
const products = [
  { id: 1, name: "Item 1", price: 10 },
  { id: 2, name: "Item 2", price: 15 },
  { id: 3, name: "Item 3", price: 20 },
  { id: 4, name: "Item 4", price: 25 },
  { id: 5, name: "Item 5", price: 30 },
  { id: 6, name: "Rec 1", price: 10 },
  { id: 7, name: "Rec 2", price: 15 },
  { id: 8, name: "Rec 3", price: 20 },
  { id: 9, name: "Rec 4", price: 25 },
  { id: 10, name: "Rec 5", price: 30 },
];
const recommendations = [
  { id: 6, name: "Rec 1", price: 10 },
  { id: 7, name: "Rec 2", price: 15 },
  { id: 8, name: "Rec 3", price: 20 },
  { id: 9, name: "Rec 4", price: 25 },
  { id: 10, name: "Rec 5", price: 30 },
];
function MakeOrderPage() {
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [searchResults, setSearchresults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setRecommendedItems(recommendations);
  }, []);
  const [cart] = useState(new Cart(1234567));  // Only initialize Cart once
  const orderService = new OrderService();

  // Use the products array for searching items
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setSearchresults([]);
      return;
    }

    const filteredItems = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchresults(filteredItems);
  };

  // Handle adding items to the cart
  const handleAddToCart = (item) => {
    // Add the item to the cart and recalculate the total price
    cart.addItem(item.id, 1, item.price); // Add to the cart (default quantity 1)
    setCartItems([...cartItems, item]);   // Update the state with the new cart items
    setTotalPrice(cart.totalPrice);       // Update the state with the new total price
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty! Add some items before checkout.");
      return;
    }
    // Use orderService to create an order from the cart
    const order = orderService.createOrder(cart.customerId, cart.items);
    console.log("Order created:", order);
    alert("Order created successfully!");
  };
  return (
    <div className="makeOrder-container">
      <h1>Make an Order</h1>
      <SearchBox onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        <RecommendationList items={searchResults} onAddToCart={handleAddToCart} />
      ) : (
        <RecommendationList items={recommendedItems} onAddToCart={handleAddToCart} />
      )}
      {/* Cart Display */}
      <CartBar cartItems={cartItems} totalPrice={totalPrice} />

      {/* Checkout Button */}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
export default MakeOrderPage;