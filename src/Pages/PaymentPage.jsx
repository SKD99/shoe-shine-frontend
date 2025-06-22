// 📁 src/pages/PaymentPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { customer, items, total, paymentMethod } = state || {};

  if (!customer || !items || items.length === 0) {
    return <h2>No order details found. Please go back to checkout.</h2>;
  }

  const handlePayment = () => {
    // Simulate a payment delay
    setTimeout(() => {
      // Navigate to invoice with all data
      navigate("/invoice", {
        state: {
          customer,
          items,
          total,
          paymentMethod,
        },
      });
    }, 1000);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>💳 Payment Gateway</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Total Amount:</strong> ₹{total}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <img src="/QR.png" alt="QR Code" style={{ width: "200px", margin: "20px auto" }} />
      <p>Scan the QR code above to pay or click below to simulate payment.</p>

      <button
        onClick={handlePayment}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        ✅ Payment Done
      </button>
    </div>
  );
};

export default PaymentPage;
