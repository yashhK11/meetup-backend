const mongoose = require("mongoose");
require("dotenv").config();

const initializeDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = { initializeDatabase };
