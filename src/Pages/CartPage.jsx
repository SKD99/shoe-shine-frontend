import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-page" style={{ padding: "40px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
         {cart.map((item, index) => (
  <div key={`${item.id}-${index}`} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
    <img src={`https://shoe-shine-app.onrender.com/static/${item.image}`} alt={item.name} style={{ width: "100px" }} />
    <h3>{item.name}</h3>
    <p>₹{item.price}</p>
    <button onClick={() => removeFromCart(item.id)}>Remove</button>
  </div>
))}


          <h3>Total: ₹{total}</h3>
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/checkout")}
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
