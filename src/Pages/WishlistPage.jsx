// 📁 src/Pages/WishlistPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    axios.get("https://shoe-shine-app.onrender.com/api/wishlist")
      .then(res => setWishlist(res.data))
      .catch(err => console.error("Error fetching wishlist", err));
  };

  const removeFromWishlist = (id) => {
    axios.delete(`https://shoe-shine-app.onrender.com/api/wishlist/${id}`)
      .then(() => {
        // Remove the item locally
        setWishlist(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => console.error("Error removing item", err));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>❤️ Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No products in wishlist yet.</p>
      ) : (
        <div className="product-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={`https://shoe-shine-app.onrender.com/static/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p>Category: {product.category}</p>
              <button
                style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", marginTop: "10px" }}
                onClick={() => removeFromWishlist(product.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
