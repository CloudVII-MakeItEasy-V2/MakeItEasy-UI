import React from "react";
import "./recommendationList.css"
function RecommendationList({ items, onAddToCart }) {
  return (
    <div className="item-list">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="item">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <button onClick={() => onAddToCart(item)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
}

export default RecommendationList;