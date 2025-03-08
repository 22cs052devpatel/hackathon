const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  kycDetails: { type: Object, required: true },
});

module.exports = mongoose.model("Seller", sellerSchema);