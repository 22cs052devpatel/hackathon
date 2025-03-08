import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Purchase = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details using the ID
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error fetching product:", error));
    }, [id]);

    const handleBuyNow = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/purchase/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: id,
                    buyerId: '65f8c8b8e4b0f4b9f8c8b8b9', // Replace with the actual buyer ID
                    amount: product.price, // Use the product price
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.status === 'completed') {
                    alert('Payment completed successfully!');
                } else {
                    alert('Payment failed. Please try again.');
                }
            } else {
                alert('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div>
            <h1>Purchase Product</h1>
            <p>Product: {product.name}</p>
            <p>Price: {product.price} HBAR</p>
            <button onClick={handleBuyNow}>Buy Now</button>
        </div>
    );
};

export default Purchase;