const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
console.log(cartRoutes);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// 🔍 Debug line (to check if MONGO_URI is coming or not)
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("ERROR:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});