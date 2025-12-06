import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import productData from "../data/product.json";

function HomePage() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(productData.slice(0, 12));
  }, []);

  const handleShopNow = () => {
    navigate("/categories");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const formatPrice = (price) => {
    return `₱${price.toLocaleString()}`;
  };

  return (
    <div className="homepage page-transition">
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
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                }}
              />
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