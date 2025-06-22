import React, { useEffect, useState } from "react";
import axios from "axios";
import Important from "../components/Important";
import { useWishlist } from "../context/WishlistContext";
import { Heart, HeartOff } from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  useEffect(() => {
    axios.get("https://shoe-shine-app.onrender.com/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="home">
      <Important />
      <h2 className="section-title">Our Top Picks</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={`http://localhost:5000/static/${product.image}`}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={() =>
                isWishlisted(product.id)
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }>
                {isWishlisted(product.id) ? <Heart color="red" /> : <HeartOff />}
              </button>

              <button onClick={() => window.location.href = `/checkout?buyNowId=${product.id}`}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
