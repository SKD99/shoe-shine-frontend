import React from "react";

const Filters = () => {
  return (
    <div className="filters">
      <input type="text" placeholder="Search by name..." />
      <select>
        <option>Size</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
      </select>
      <select>
        <option>Color</option>
        <option>Red</option>
        <option>Blue</option>
      </select>
      <select>
        <option>Category</option>
        <option>Sneaker</option>
        <option>Loafer</option>
        <option>Sports</option>
        <option>Boots</option>
        <option>Joggers</option>
      </select>
      <select>
        <option>Price</option>
        <option>Under ₹5000</option>
        <option>₹5000 - ₹10000</option>
        <option>Above ₹10000</option>
      </select>
    </div>
  );
};

export default Filters;
