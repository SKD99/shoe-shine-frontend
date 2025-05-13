// important.jsx
const important = () => {
  return (
    <main className="important container">
      <div className="important-content">
        <h1>YOUR FEET DESERVE THE BEST</h1>
        <p>
          YOUR FEET DESERVE THE BEST AND WE'RE HERE TO HELP YOU WITH OUR
          SHOES. YOUR FEET DESERVE THE BEST AND WE'RE HERE TO HELP YOU WITH OUR
          SHOES.
        </p>
        <div className="important-button">
          <button>Shop Now</button>
          <button>Category</button>
        </div>
        <div className="shopping">
          <p>Also Available On</p>
          <div className="brand-icons">
            <img src="./public/amazon.jpeg" alt="amazon-logo" style={{ width: "80px", height: "auto" }} />
            <img src="./public/flipkart.png" alt="flipkart-logo"style={{ width: "100px", height: "auto" }} />
          </div>
        </div>
      </div>
      <div className="important-image"></div>
      <img src="./public/shoe.jpg" alt="shoe" className="shoe-image"style={{ width: "500px", height: "350px" }} />
    </main>
  );
};

export default important;
