import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import AdminEditProduct from "./AdminEditProduct";

export default function AdminProductList() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: "Product Name", price: "100", stocks: 100 },
    { id: 2, name: "Product Name", price: "100", stocks: 100 },
    { id: 3, name: "Product Name", price: "100", stocks: 100 },
    { id: 4, name: "Product Name", price: "100", stocks: 100 },
    { id: 5, name: "Product Name", price: "100", stocks: 100 },
  ];

  const openEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  return (
    <div className="admin-main">
      <div className="product-table-wrapper">

        {/* HEADER */}
        <div className="table-header">
          <span>ID</span>
          <span>PRODUCT NAME</span>
          <span>PRICE</span>
          <span>STOCKS</span>
          <span style={{ textAlign: "right" }}>ACTIONS</span>
        </div>

        {/* PRODUCT ROWS */}
        <div className="table-body">
          {products.map((p) => (
            <div className="product-row" key={p.id}>
              <span>{p.id}</span>
              <span>{p.name}</span>
              <span>{p.price}</span>
              <span>{p.stocks}</span>

              <span className="actions">
                <FiEdit 
                  size={18} 
                  className="edit-icon" 
                  onClick={() => openEdit(p)}
                />
                <FaTrash 
                  size={18} 
                  className="delete-icon" 
                />
              </span>
            </div>
          ))}
        </div>

      </div>

      {editModalOpen && selectedProduct && (
        <AdminEditProduct
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
