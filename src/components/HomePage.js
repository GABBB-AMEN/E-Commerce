import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import productData from "../data/product.json";

function HomePage() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Get first 8 products as featured products
    setFeaturedProducts(productData.slice(0, 12));
  }, []);

  const handleShopNow = () => {
    navigate("/categories");
  };

  const formatPrice = (price) => {
    return `₱${price.toLocaleString()}`;
  };

  return (
    <div className="homepage">
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
          <button className="shop-now-btn" onClick={handleShopNow}>
            SHOP NOW
          </button>
        </div>
      </div>

      <section className="featured-section">
        <h2>FEATURED PRODUCTS</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-name">{product.name}</div>
              <div className="product-price">{formatPrice(product.price)}</div>
              {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;