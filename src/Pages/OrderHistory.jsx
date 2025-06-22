import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://shoe-shine-app.onrender.com/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>📦 Order History</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} style={{ borderBottom: "1px solid #ccc", marginBottom: "20px", paddingBottom: "15px" }}>
            <h3>👤 {order.customer?.name || "Unknown Customer"}</h3>
            <p>📍 {order.customer?.address}</p>
            <p>📞 {order.customer?.phone}</p>
            <p>💳 Payment: {order.paymentMethod}</p>
            <p>💰 Total: ₹{order.total}</p>
            <p>🚚 Delivery By: {order.deliveryDate || "N/A"}</p>

            <h4>🛍 Items:</h4>
            <ul>
              {order.items?.map((item, i) => (
                <li key={i}>{item.name} — ₹{item.price} ({item.category})</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
