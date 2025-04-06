const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("⚡ Using existing MongoDB connection");
      return;
    }

    console.log("⏳ Connecting to MongoDB...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = dbConnection;
