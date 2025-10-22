import React from "react";
import "./HomePage.css";
import productData from "../data/product.json";

function Categories() {
  const formatPrice = (price) => {
    return `₱${price.toLocaleString()}`;
  };

  return (
    <div className="homepage">
      <section className="featured-section">
        <h2>FEATURED PRODUCTS</h2>
        <div className="product-grid">
          {productData.map((product) => (
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

export default Categories;