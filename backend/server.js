require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Final bulletproof CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://store-recommendation-system-xlfl.vercel.app",   // user
  "https://store-recommendation-system.vercel.app"         // admin
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/api/user", require("./routes/authRoutes"));
app.use("/api/store", require("./routes/storeRoutes"));
app.use("/api/admin", require("./routes/adminAuthRoutes"));
app.use("/api/admin", require("./routes/adminStoreRoutes"));

// ✅ Health check
app.get("/", (req, res) => res.send("🛍️ Store Recommender API Running"));

// ✅ Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
