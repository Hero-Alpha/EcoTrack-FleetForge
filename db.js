require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error("MongoDB URI is not defined. Check your .env file.");
    }
    await mongoose.connect(uri);
    console.log("MongoDB Atlas connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
