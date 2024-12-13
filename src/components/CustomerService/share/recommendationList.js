const RecommendationList = ({ items, onAddToCart }) => {
  return (
    <div className="recommendation-list">
      {items.map((item) => (
        <div className="recommendation-item" key={item.id}>
          <h3>{item.name}</h3>
          <p>${item.price.toFixed(2)}</p>
          <button
            className="add-to-cart-button"
            onClick={() => onAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;