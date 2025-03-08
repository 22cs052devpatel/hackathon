require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Database
connectDB();

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/sellers", require("./routes/sellerRoutes"));
app.use("/api/purchase", require("./routes/purchaseRoutes"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});