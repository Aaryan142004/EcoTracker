const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://prathmeshgahukar001_db_user:ygZYHAfggYLXJ7If@cluster0.xzzlqix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
