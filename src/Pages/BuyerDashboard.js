import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/BuyerDashboard.css";

export default function BuyerDashboard() {
    const [products, setProducts] = useState([]); // State to store fetched products
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/products") // Replace with your actual backend URL
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleBuyNow = (productId) => {
        navigate(`/purchase/${productId}`); // Navigate to the purchase page
    };

    return (
        <div className="buyer-dashboard">
            <div className="container">
                <h1>Buyer Dashboard</h1>
                <p>Browse and purchase products listed by sellers.</p>
                <div className="product-list">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="product-card">
                                <img src={product.imageUrl || "https://via.placeholder.com/150"} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="price">{product.price} HBAR</p>
                                <button onClick={() => handleBuyNow(product.id)}>Buy Now</button>
                            </div>
                        ))
                    ) : (
                        <p>Loading products...</p>
                    )}
                </div>
            </div>
        </div>
    );
}