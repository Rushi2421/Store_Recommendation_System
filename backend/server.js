const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import route files
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const adminStoreRoutes = require("./routes/adminStoreRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Whitelist
const allowedOrigins = [
  "http://localhost:5173", // user local
  "http://localhost:5174", // admin local
  "https://store-recommendation-system-xlfl.vercel.app", // user Vercel frontend
  "https://store-recommendation-system.vercel.app" // admin Vercel panel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// ✅ Route Handlers
app.use("/api/auth", authRoutes);               // user auth & preferences
app.use("/api/store", storeRoutes);             // ML store recommendations
app.use("/api/admin", adminStoreRoutes);        // admin store CRUD
app.use("/api/adminauth", adminAuthRoutes);     // admin login/register

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
