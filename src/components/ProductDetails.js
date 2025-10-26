import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import productData from "../data/product.json";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = productData.find(item => item.id === parseInt(id));

  if (!product) {
    navigate("/categories");
    return null;
  }

  const formatPrice = (price) => `₱${price.toLocaleString()}`;

  const handleAddToCart = () => {
    addToCart({ ...product });
    alert("Item added to cart!");
  };

  const handleBuyNow = () => {
    addToCart({ ...product });
    navigate("/checkout", { state: { cartItems: [{ ...product, quantity: 1 }] } });
  };

  return (
    <div className="product-details-container">
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
          <div className="divider"></div>
          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              ADD TO CART
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
