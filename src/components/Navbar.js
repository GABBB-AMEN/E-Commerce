import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="nav-outer">
      <div className="nav-inner">
        <Link to="/" className="logo">
          <span>e</span>Store
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>
              CATEGORIES
            </Link>
          </li>
        </ul>

        <div className="nav-right">
          <div className="search-pill">
            <input type="text" placeholder=" " aria-label="search" />
          </div>

          <div className="icon-circle" title="Account">
            <FaUser />
          </div>
          <div className="icon-section">
              <Link to="/cart" className="icon-circle" title="Cart">
                <FaShoppingCart />
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;