import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Loads variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas using .env variable
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Example route (you can replace with your own)
app.get("/", (req, res) => {
  res.send("Placement Prep backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
