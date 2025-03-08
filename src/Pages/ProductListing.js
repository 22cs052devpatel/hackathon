import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/pages/ProductListing.css";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch products from the backend
    axios.get("/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handlePurchase = (productId) => {
    navigate(`/purchase/${productId}`); // Redirect to the purchase page
  };

  return (
    <div className="product-listing">
      <h1>Product Listings</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">{product.price} HBAR</p>
            <button onClick={() => handlePurchase(product._id)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;