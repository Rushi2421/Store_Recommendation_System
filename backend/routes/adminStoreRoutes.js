// backend/routes/adminStoreRoutes.js
const express = require("express");
const router = express.Router();
const {
  addStore,
  getMyStores,
  updateStore,
  deleteStore,
  getStoreById, // ✅ Make sure this is included
} = require("../controllers/adminStoreController");
const verifyAdminToken = require("../middleware/verifyAdminToken");

// POST - add new store
router.post("/addstore", verifyAdminToken, addStore);

// GET - get all stores added by the logged-in admin
router.get("/mystore", verifyAdminToken, getMyStores);

// PUT - update a store
router.put("/store/:id", verifyAdminToken, updateStore);

// DELETE - delete a store
router.delete("/store/:id", verifyAdminToken, deleteStore);

// ✅ GET - get a single store by ID
router.get("/store/:id", verifyAdminToken, getStoreById);

module.exports = router;
