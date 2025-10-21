import React from "react";
import "./Navbar.css";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="nav-outer">
      <div className="nav-inner">
        <div className="logo">
          <span>e</span>Store
        </div>

        <ul className="nav-links">
          <li>HOME</li>
          <li>CATEGORIES</li>
        </ul>

        <div className="nav-right">
          <div className="search-pill">
            <input type="text" placeholder=" " aria-label="search" />
          </div>

          <div className="icon-circle" title="Account">
            <FaUser />
          </div>
          <div className="icon-circle" title="Cart">
            <FaShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;