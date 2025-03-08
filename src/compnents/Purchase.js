import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/pages/Purchase.css";

function Purchase() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details from the backend
    axios.get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  const handlePurchase = async () => {
    try {
      // Simulate payment using HBAR
      const response = await axios.post("/api/purchase", {
        productId: id,
        buyerId: "65f8c8b8e4b0f4b9f8c8b8b9", // Hardcoded buyerId (replace with actual buyerId)
      });
      console.log("Purchase successful:", response.data);
      alert("Purchase successful!");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Failed to complete purchase.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="purchase">
      <h1>Purchase Product</h1>
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p className="price">{product.price} HBAR</p>
        <button onClick={handlePurchase}>Confirm Purchase</button>
      </div>
    </div>
  );
}

export default Purchase;