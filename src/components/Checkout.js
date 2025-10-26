import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useCart } from "../context/CartContext";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const merchandiseSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let shippingSubtotal = totalQuantity * 36;
  if (merchandiseSubtotal > 1000) shippingSubtotal += 70;

  const totalPayment = merchandiseSubtotal + shippingSubtotal;

  const [paymentMethod, setPaymentMethod] = React.useState("cod");

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    navigate("/cart", { state: { removeItems: cartItems } });
  };

  return (
    <div className="checkout-container">
      <h2>CHECKOUT</h2>
      <div className="checkout-card">
        <div className="address-section">
          <strong>Delivery Address:</strong>{" "}
          Juan Dela Cruz, 123 Barangay Street, Sampaloc, Manila, Philippines,
          09123456789
        </div>

        <h3>Products Ordered</h3>
        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img src={item.image} alt={item.name} width="50" />
                    {item.name}
                  </td>
                  <td>₱{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₱{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Payment Method</h3>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            COD
          </label>
          <label>
            <input
              type="radio"
              value="gcash"
              checked={paymentMethod === "gcash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            GCash
          </label>
        </div>

        <div className="checkout-summary">
          <div>
            <span>Merchandise Subtotal</span>
            <span>₱{merchandiseSubtotal}</span>
          </div>
          <div>
            <span>Shipping Fee</span>
            <span>₱{shippingSubtotal}</span>
          </div>
          <div className="total-payment">
            <span>Total Payment</span>
            <span>₱{totalPayment}</span>
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
        >
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
