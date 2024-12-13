import React from "react";
import "./cartBar.css";

function CartBar({ cartItems, totalPrice }) {
  return (
    <div className="cart-display">
      <h3>Cart Summary</h3>
      <p>Total Items: {cartItems.length}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
}

export default CartBar;