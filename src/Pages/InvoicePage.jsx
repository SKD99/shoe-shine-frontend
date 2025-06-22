import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

const InvoicePage = () => {
  const { state } = useLocation();
  const { customer, items, total, paymentMethod } = state || {};

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Shoe_Shine_Invoice",
  });

  if (!customer || !items || items.length === 0) {
    return <h2>Invalid invoice. Please complete payment first.</h2>;
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  useEffect(() => {
    const newOrder = {
      customer,
      items,
      total,
      paymentMethod,
      deliveryDate: deliveryDate.toDateString(),
    };

    axios.post("https://shoe-shine-app.onrender.com/api/orders", newOrder)
      .then((res) => {
        console.log("✅ Order saved to DB:", res.data);
      })
      .catch((err) => {
        console.error("❌ Failed to save order:", err);
      });
  }, []);

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
      <div ref={componentRef}>
        <h2>🧾 Shoe Shine - Invoice</h2>
        <hr />

        <h3>🛒 Ordered Items:</h3>
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>
              <strong>{item.name}</strong> — ₹{item.price} ({item.category})
            </li>
          ))}
        </ul>

        <h3>💳 Payment Summary:</h3>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Total Amount:</strong> ₹{total}</p>

        <h3>📦 Shipping To:</h3>
        <p>{customer.name}</p>
        <p>{customer.address}</p>
        <p>📞 {customer.phone}</p>
        <p><strong>📅 Delivery By:</strong> {deliveryDate.toDateString()}</p>

        <hr />
        <p style={{ fontWeight: "bold", marginTop: "20px" }}>
          ✅ Thank you for shopping with Shoe Shine! ✨
        </p>
      </div>

      <button
        onClick={handlePrint}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#ff6b6b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        📄 Download Invoice
      </button>
    </div>
  );
};

export default InvoicePage;
