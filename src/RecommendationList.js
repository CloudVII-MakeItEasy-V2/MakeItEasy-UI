import React from "react";

function RecommendationList({ items, onAddToCart }) {
  return (
    <div className="item-list">
      <h3>Recommended Items</h3>
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