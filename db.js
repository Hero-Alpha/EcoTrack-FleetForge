require('dotenv').config(); // Load environment variables before anything else
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error("MongoDB URI is not defined. Check your .env file.");
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectDB;
