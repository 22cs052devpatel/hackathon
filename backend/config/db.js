const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://pdev444444:k7BYVcgDQiLtBUDs@cluster0.njka4.mongodb.net/p2p-marketplace?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;