import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const { cartItems, setCartItems, removeFromCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.removeItems) {
        location.state.removeItems.forEach(item => {
        removeFromCart(item.id);
        });
    }
  }, [location.state, removeFromCart]);


  const handleIncrease = id => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrease = id => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSelect = id => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSelectAll = checked => {
    const updatedCart = cartItems.map(item => ({
      ...item,
      selected: checked
    }));
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const allSelected =
    cartItems.length > 0 && cartItems.every(item => item.selected);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item before proceeding to checkout.");
      return;
    }
    navigate("/checkout", { state: { cartItems: selectedItems } });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="no-items">No items in your cart.</div>
      ) : (
        <>
          <div className="cart-list-wrapper">
            <div className="cart-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <input
                    type="checkbox"
                    checked={item.selected || false}
                    onChange={() => handleSelect(item.id)}
                    className="cart-checkbox"
                  />
                  <img src={item.image} alt={item.name} className="cart-image" />
                  <div className="cart-details">
                    <p className="cart-name">{item.name}</p>
                    <p className="cart-price" style={{ color: "#FF7E0D" }}>
                      ₱{item.price}
                    </p>
                  </div>
                  <div className="cart-actions">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="qty-input"
                    />
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <FaTrashAlt
                    className="trash-icon"
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="cart-footer">
            <div className="footer-left">
              <label className="select-all">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={e => handleSelectAll(e.target.checked)}
                />
                Select All
              </label>
            </div>
            <div className="footer-right">
              <p className="cart-total">
                TOTAL:{" "}
                <span style={{ color: "#FF7E0D" }}>₱{totalPrice}</span>
              </p>
              <button className="checkout-btn" onClick={handleCheckout}>
                Check Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
