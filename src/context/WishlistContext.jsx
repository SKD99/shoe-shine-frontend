import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // ✅ Load from backend on mount
  useEffect(() => {
    axios.get("https://shoe-shine-app.onrender.com/api/wishlist")
      .then(res => setWishlist(res.data))
      .catch(err => console.error("Failed to load wishlist", err));
  }, []);

  const addToWishlist = (product) => {
    axios.post("https://shoe-shine-app.onrender.com/api/wishlist", product)
      .then(() => setWishlist((prev) => [...prev, product]))
      .catch(err => console.error("Add error", err));
  };

  const removeFromWishlist = (productId) => {
    axios.delete(`https://shoe-shine-app.onrender.com/api/wishlist/${productId}`)
      .then(() => setWishlist((prev) => prev.filter((item) => item.id !== productId)))
      .catch(err => console.error("Remove error", err));
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};
