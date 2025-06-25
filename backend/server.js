require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup
app.use(cors({
 origin: ["http://localhost:5173", "http://localhost:5174","https://store-recommendation-system.vercel.app/","https://store-recommendation-system-xlfl.vercel.app/"],// frontend origin
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Public Routes
app.use("/api/user", require("./routes/authRoutes"));      // user login/register
app.use("/api/store", require("./routes/storeRoutes"));    // store recommendation routes

// ✅ Admin Routes (NEW)
app.use("/api/admin", require("./routes/adminAuthRoutes"));       
app.use("/api/admin", require("./routes/adminStoreRoutes"));  // add/update/delete/mystore (protected)

// ✅ Root
app.get("/", (req, res) => res.send("🛍️ Store Recommender API Running"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
