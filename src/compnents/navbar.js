import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">P2P Marketplace</Link>
        <div className="navbar-links">
          <Link to="/seller">Seller</Link>
          <Link to="/buyer">Buyer</Link>
          <Link to="/products">Products</Link>
        </div>
      </div>
    </nav>
  );
}