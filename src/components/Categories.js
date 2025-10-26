import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import productData from "../data/product.json";

function Categories() {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return `₱${price.toLocaleString()}`;
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // FIXED: Use process.env.PUBLIC_URL for public folder
  const getImagePath = (imagePath) => {
    return process.env.PUBLIC_URL + imagePath;
  };

  return (
    <div className="homepage">
      <section className="featured-section">
        <h2>ALL PRODUCTS</h2>
        <div className="product-grid">
          {productData.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product.id)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={getImagePath(product.image)} 
                alt={product.name} 
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
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

export default Categories;