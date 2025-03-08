import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SellerDashboard from "./Pages/SellerDashboard";
import Home from "./Pages/Home";
import Footer from "./compnents/Footer";
import Navbar from "./compnents/navbar";
import BuyerDashboard from "./Pages/BuyerDashboard";
import ProductListing from "./Pages/ProductListing";
import Purchase from "./compnents/Purchase";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/purchase/:id" element={<Purchase />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;