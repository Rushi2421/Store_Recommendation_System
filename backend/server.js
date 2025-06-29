require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Final robust CORS configuration
const allowedOrigins = [
  "http://localhost:5173",  // local user
  "http://localhost:5174",  // local admin
  "https://store-recommendation-system-xlfl.vercel.app",  // deployed user frontend
  "https://store-recommendation-system.vercel.app"        // deployed admin
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Body parser
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ User routes
app.use("/api/user", require("./routes/authRoutes"));      
app.use("/api/store", require("./routes/storeRoutes"));

// ✅ Admin routes
app.use("/api/admin", require("./routes/adminAuthRoutes"));       
app.use("/api/admin", require("./routes/adminStoreRoutes"));  

// ✅ Health check
app.get("/", (req, res) => res.send("🛍️ Store Recommender API Running"));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
