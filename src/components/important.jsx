import React from "react";

const Important = () => {
  return (
    <main className="important container">
      <div className="important-content">
        <h1>"Shine Every Step — Where Your Walk Begins With Style."</h1>
        <p>Shoe Shine brings unmatched comfort, unmatched confidence.</p>
        <div className="important-button">
<button onClick={() => window.location.href='/category/men'}>Men</button>
<button onClick={() => window.location.href='/category/women'}>Women</button>
<button onClick={() => window.location.href='/category/kids'}>Kids</button>
<button onClick={() => window.location.href='/category/sports'}>Sports</button>

        </div>
        <div className="shopping">
          <p>Also Available On</p>
          <div className="brand-icons">
            <img src="/amazon.jpeg" alt="amazon" className="brand-icon" />
            <img src="/flipkart.png" alt="flipkart" className="brand-icon" />
          </div>
        </div>
      </div>
      <img src="/shoe.jpg" alt="shoe" className="shoe-image" />
    </main>
  );
};

export default Important;