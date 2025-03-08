const Seller = require("../models/Seller");

exports.createSeller = async (req, res) => {
  const { name, email, kycDetails } = req.body;
  const seller = new Seller({ name, email, kycDetails });
  try {
    const newSeller = await seller.save();
    res.status(201).json(newSeller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};