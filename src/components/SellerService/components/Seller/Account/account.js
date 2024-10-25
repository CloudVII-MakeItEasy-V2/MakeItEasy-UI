// src/components/Seller/Account/account.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Account.css';

const Account = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="account-container">
      <div className="left">
        <button onClick={() => navigate('/')} className="back-button">
        Home
      </button>
      </div>
      <div>
          <h1>Seller Profile</h1>
      </div>
      <div>
  <p>
    <span className='bold'>Seller ID: </span> 123456
  </p>

  <p>
    <span className='bold'>Name: </span> some seller
  </p>

  <p>
    <span className='bold'>Email: </span> seller@sellerCompany.com
  </p>

  <p>
    <span className='bold'>Address: </span> New York
  </p>

  <p>
    <span className='bold'>Phone: </span> +1 123-123-123
  </p>
</div>

      
    </div>
  );
};

export default Account;
