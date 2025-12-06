import React, { useState, useEffect } from "react";

export default function AdminEditProduct({ isOpen, onClose, product, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    variation: "",
    price: "",
    stocks: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // Load product into form
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        variation: product.variation || "",
        price: product.price,
        stocks: product.stocks,
        description: product.description || "",
      });
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Submit to Laravel
  const handleUpdate = () => {
    setLoading(true); // show loading

    fetch(`http://your-laravel-api.test/api/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(updated => {
        console.log("Updated product:", updated);

        if (onUpdated) onUpdated(updated);

        setLoading(false); // stop loading
        onClose(); // close modal
      })
      .catch(err => {
        console.error("Update error:", err);
        setLoading(false); // stop loading even on error
      });
  };

  return (
    <div className="edit-modal-backdrop" onClick={onClose}>
      <div className="edit-modal-card" onClick={(e) => e.stopPropagation()}>
        <span className="edit-modal-close" onClick={!loading ? onClose : null}>×</span>
        <h2 className="addproduct-title">Edit Product</h2>

        <div className="addproduct-grid">
          <div className="input-group">
            <label>PRODUCT NAME</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>VARIATION</label>
            <input
              type="text"
              value={formData.variation}
              onChange={(e) => updateField("variation", e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>PRICE</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => updateField("price", e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>STOCKS</label>
            <input
              type="number"
              value={formData.stocks}
              onChange={(e) => updateField("stocks", e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>DESCRIPTION</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              disabled={loading}
            ></textarea>
          </div>
        </div>

        {/* LOADING INDICATOR */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Updating product...</p>
          </div>
        )}

        <button
          className="addproduct-btn"
          style={{ marginTop: "20px", opacity: loading ? 0.6 : 1 }}
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Update Product"}
        </button>
      </div>
    </div>
  );
}
