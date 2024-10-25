// src/components/Seller/Seller.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Seller.css'; // Import the CSS file for styling

const Seller = () => {
  return (
    <div className="seller-container">
      <div className="rectangles">
        <Link to="/SellerOrders" className="rectangle">
        <div> 
        <div>  <h1>Orders</h1> </div>
        <div>   <p> track, manage, and update the status of customer orders.</p></div>
        </div>
    
        </Link>
        <Link to="/Sellerproduct" className="rectangle">
        <div> 
        <div>  <h1>Products</h1> </div>
        <div>  
           <p> add, edit, and manage product listings for sale.</p>
        </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Seller;
