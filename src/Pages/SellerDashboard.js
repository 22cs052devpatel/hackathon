import React, { useState } from "react";
import axios from "axios";
import "../styles/pages/SellerDashboard.css";

function SellerDashboard() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add sellerId to the product object
      const productData = { ...product, sellerId: "65f8c8b8e4b0f4b9f8c8b8b8" }; // Hardcoded sellerId
      const response = await axios.post("/api/products", productData);
      console.log("Product listed:", response.data);
      alert("Product listed successfully!");
      setProduct({ name: "", description: "", price: "", image: "" }); // Clear the form
    } catch (error) {
      console.error("Error listing product:", error.response || error); // Log the error details
      alert("Failed to list product.");
    }
  };

  return (
    <div className="seller-dashboard">
      <h1>Seller Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Product Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price in HBAR"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          required
        />
        <button type="submit">List Product</button>
      </form>
    </div>
  );
}

export default SellerDashboard;