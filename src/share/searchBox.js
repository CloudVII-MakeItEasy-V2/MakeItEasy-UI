import React, { useState } from "react";
import "./searchBox.css"
function SearchBox({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setInputValue(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={inputValue}
        onChange={handleSearch}
        placeholder="Search for items..."
      />
    </div>
  );
}

export default SearchBox;