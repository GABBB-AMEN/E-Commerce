import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Categories from "./components/Categories";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import LoginPanel from "./components/LoginPanel";
import AdminLayout from "./admin/AdminLayout";
import AdminProductList from "./admin/AdminProductList";
import AdminAddProduct from "./admin/AdminAddProduct";
import AdminEditProduct from "./admin/AdminEditProduct";
import PublicLayout from "./admin/PublicLayout";


function AppContent() {
  const location = useLocation()
const hideNavbar = location.pathname === "/login"

return (
  <div className="App">
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<LoginPanel />} />
        <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<AdminProductList />} />
          <Route path="products/add" element={<AdminAddProduct />} />
          <Route path="products/edit/:id" element={<AdminEditProduct />} />
        </Route>
      </Routes>
  </div>
  )
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  )
}

export default App;