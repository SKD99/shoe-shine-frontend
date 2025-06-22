import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart,HeartOff  } from "lucide-react";
const CategoryPage = () => {
  const navigate = useNavigate();
  const { type } = useParams(); // e.g., men/women/kids/sports
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = (id) => wishlist.some((item) => item.id === id);
  // Fetch all products
  useEffect(() => {
    axios.get("https://shoe-shine-app.onrender.com/api/products")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // Filter products by selected category and search query
  const filteredProducts = allProducts.filter(product =>
    product.category.toLowerCase() === type.toLowerCase() &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="category-page">
      <h2 className="section-title">{type.toUpperCase()} Shoes</h2>

      {/* 🔍 Search Input */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search shoes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* 🥿 Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={`https://shoe-shine-app.onrender.com/static/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
             <button onClick={() =>
      isWishlisted(product.id)
        ? removeFromWishlist(product.id)
        : addToWishlist(product)
    }>
      {isWishlisted(product.id) ? "❤️ Remove" : "🤍 Wishlist"}
    </button>

              <button onClick={() => addToCart(product)}>Add to Cart</button>

              <button onClick={() => navigate("/checkout", { state: { fromBuyNow: true, product } })}>
  Buy Now
</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontWeight: "bold" }}>No matching shoes found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
