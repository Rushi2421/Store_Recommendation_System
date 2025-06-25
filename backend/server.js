const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // local user frontend
  "http://localhost:5174", // local admin frontend
  "https://store-recommendation-system.vercel.app", // deployed user frontend
  "https://store-recommendation-sys-git-b95058-rushikesh-rapashes-projects.vercel.app", // deployed admin panel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// ✅ Import routes
const authRoutes = require("./routes/authRoutes");
const storeRoutes = require("./routes/storeRoutes");
const adminStoreRoutes = require("./routes/adminStoreRoutes");

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/admin", adminStoreRoutes);

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
