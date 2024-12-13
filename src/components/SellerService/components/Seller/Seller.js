// src/components/Seller/Seller.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Seller.css'; // Import the CSS file for styling

import '../Navbar.js'
const Seller = () => {
  return (
    <div className="seller-container">
      <div className="rectangles">
        <Link to="/SellerOrders" className="rectangle">
        <div className='upper2'> 
        <div>  <h1 className="white">Orders</h1> </div>
        <div>   <p className="white"> track, manage, and update the status of customer orders.</p></div>
        </div>
    
        </Link>
        <Link to="/Sellerproduct" className="rectangle">
        <div className='upper'> 
        <div>  <h1 className="white">Products</h1> </div>
        <div>  
           <p className="white"> add, edit, and manage product listings for sale.</p>
        </div>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Seller;
