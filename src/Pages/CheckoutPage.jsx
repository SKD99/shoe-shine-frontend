// src/pages/CheckoutPage.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";
const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const params = new URLSearchParams(location?.search || ""); // ✅ fix null issue
  const buyNowId = params.get("buyNowId");

  useEffect(() => {
    if (buyNowId) {
      axios.get("https://shoe-shine-app.onrender.com/api/products")
        .then((res) => {
          const found = res.data.find((p) => p.id.toString() === buyNowId);
          if (found) setProduct(found);
        })
        .catch((err) => console.error("Product fetch error", err));
    }
  }, [buyNowId]);

  const items = buyNowId && product ? [product] : cart;
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("UPI");

  const handleProceedToPayment = () => {
    if (!name || !address || !phone) {
      alert("Please fill in all details");
      return;
    }

    const checkoutData = {
      customer: { name, address, phone },
      items,
      paymentMethod: payment,
      total,
    };

    navigate("/payment", { state: checkoutData });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>🧾 Checkout</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>
        <br />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br />
        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="COD">Cash on Delivery</option>
        </select>
        <br />
        <p><strong>Total: ₹{total}</strong></p>

        <button
          type="button"
          className="buy-button"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
