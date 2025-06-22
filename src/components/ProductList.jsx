import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://shoe-shine-app.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.from_db.length ? data.from_db : data.from_memory);
      });
  }, []);

  return (
    <div className="product-list">
      <h2>Our Top Picks</h2>
      <div className="products">
        {products.map((shoe) => (
          <div className="product" key={shoe.id}>
            <img src={`https://shoe-shine-app.onrender.com${shoe.image}`} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p>₹{shoe.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
