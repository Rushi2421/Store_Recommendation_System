const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: String,
  area: String,
  address: String,
  phone: String,
  rating: Number,
  total_reviews: Number,
  store_type: String,
  opening_time: String,
  pincode: String,
  latitude: Number,
  longitude: Number,
  city: String,
  photo: String,

  // NEW: Optional admin user reference
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminUser",
    required: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Store", storeSchema);
