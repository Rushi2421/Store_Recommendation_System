const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();
const User = require("../models/User");

router.post("/recommend", async (req, res) => {
  try {
    const { latitude, longitude, userId, storeType } = req.body;

    if (!latitude || !longitude || !storeType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save to user preferences
    const user = await User.findById(userId);
    if (user) {
      user.preferences.push(storeType);
      if (user.preferences.length > 10) user.preferences.shift();
      await user.save();
    }

    const py = spawn("python", ["./ml/recommend_stores.py"]);

    const payload = JSON.stringify({
      lat: latitude,
      lon: longitude,
      storeType: storeType
    });

    let result = "";
    py.stdin.write(payload);
    py.stdin.end();

    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.stderr.on("data", (err) => {
      console.error("Python error:", err.toString());
    });

    py.on("close", () => {
      try {
        const parsed = JSON.parse(result);
        const geojson = {
          type: "FeatureCollection",
          features: parsed.map(store => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [store.longitude, store.latitude]
            },
            properties: {
              name: store.name,
              address: store.address,
              phone: store.phone,
              opening_time: store.opening_time,
              city: store.city,
              store_type: store.store_type,
              rating: store.rating
            }
          }))
        };
        res.json({ geojson });
      } catch (err) {
        console.error("Parsing error:", err.message);
        res.status(500).json({ message: "Failed to parse ML output" });
      }
    });

  } catch (err) {
    console.error("Node error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
