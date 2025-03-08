
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

module.exports = mongoose.model("Transaction", transactionSchema);