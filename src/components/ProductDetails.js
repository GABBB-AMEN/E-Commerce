import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import productData from "../data/product.json";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = productData.find(item => item.id === parseInt(id));
  const [rating, setRating] = useState(3);
  const [selectedVariation, setSelectedVariation] = useState(null);

  // Helper to get variations based on category
  const getVariations = (product) => {
    if (!product) return null;
    switch (product.category) {
      case "Laptops":
      case "Smartphones":
      case "Tablets":
        return { type: "STORAGE", options: ["256GB", "512GB", "1TB"] };
      case "Headphones":
      case "Mice":
      case "Keyboards":
        return { type: "COLOR", options: ["BLACK", "WHITE", "SILVER"] };
      case "Monitors":
      case "Gaming Consoles":
        return { type: "EDITION", options: ["STANDARD", "DIGITAL", "PRO"] };
      case "Cameras":
      case "Drones":
        return { type: "BUNDLE", options: ["BODY ONLY", "KIT LENS", "FLY MORE"] };
      case "Smartwatches":
        return { type: "SIZE", options: ["41MM", "45MM"] };
      default:
        return { type: "OPTION", options: ["DEFAULT"] };
    }
  };

  const variations = getVariations(product);

  // Set default selection on load
  React.useEffect(() => {
    if (variations && variations.options.length > 0 && !selectedVariation) {
      setSelectedVariation(variations.options[0]);
    }
  }, [variations, selectedVariation]);

  if (!product) {
    navigate("/categories");
    return null;
  }

  const formatPrice = (price) => `₱${price.toLocaleString()}`;

  const handleAddToCart = () => {
    addToCart({ ...product, selectedVariation, variationType: variations?.type });
    alert(`Item added to cart with ${variations?.type}: ${selectedVariation}!`);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, selectedVariation, variationType: variations?.type });
    navigate("/checkout", { state: { cartItems: [{ ...product, quantity: 1, selectedVariation, variationType: variations?.type }] } });
  };

  return (
    <div className="product-details-container page-transition">
      <div className="product-details-card">
        <div className="product-image-section">
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-detail-image"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
              }}
            />
          </div>
        </div>

        <div className="product-info-section">
          <div className="item-name">{product.name}</div>
          <div className="price-text">PRICE</div>
          <div className="price-amount">{formatPrice(product.price)}</div>
          <div className="product-details-text">PRODUCT DETAILS</div>
          <p className="product-description">{product.description}</p>

          {variations && (
            <div className="options-section">
              <div className="option-label">{variations.type}:</div>
              <div className="option-buttons">
                {variations.options.map((option) => (
                  <button
                    key={option}
                    className={`option-btn ${selectedVariation === option ? 'active' : ''}`}
                    onClick={() => setSelectedVariation(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              BUY NOW
            </button>
          </div>

          <div className="ratings-section">
            <div className="ratings-label">RATINGS:</div>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`star-icon ${star <= rating ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="24px"
                  height="24px"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
