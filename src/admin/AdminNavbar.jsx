import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSearch } from "react-icons/fa";
import "./Admin.css";

export default function AdminNavbar() {
  return (
    <div className="nav-outer">
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/admin/products" className="logo">
          <span>e</span>Store Admin
        </Link>

        {/* Admin Links */}
        <ul className="nav-links">
          <li>
            <Link to="/admin/products" style={{ textDecoration: "none", color: "inherit" }}>
              PRODUCT LIST
            </Link>
          </li>
          <li>
            <Link to="/admin/products/add" style={{ textDecoration: "none", color: "inherit" }}>
              ADD PRODUCT
            </Link>
          </li>
        </ul>

        {/* Search & Admin Icon */}
        <div className="nav-right">
          <div className="search-pill">
            <input type="text" placeholder="Search products..." aria-label="search" />
          </div>

          <Link to="/admin/account" className="icon-circle" title="Admin Account">
            <FaUser />
          </Link>
        </div>
      </div>
    </div>
  );
}
