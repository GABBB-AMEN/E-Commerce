import React from "react";
import "./HomePage.css";

function HomePage() {

  const products = [
    { id: 1, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 2, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 3, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 4, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 5, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 6, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 7, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 8, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 9, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 10, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 11, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
    { id: 12, name: "LAPTOP", price: "₱49,999", image: "/laptop.jpg" },
  ];

  return (
    <div className="homepage">
      {}
      <div
        className="home-banner"
        style={{
          backgroundImage: "url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="banner-button-container">
          <button className="shop-now-btn">SHOP NOW</button>
        </div>
      </div>

      {}
      <section className="featured-section">
        <h2>FEATURED PRODUCTS</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-name">{product.name}</div>
              <div className="product-price">{product.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;