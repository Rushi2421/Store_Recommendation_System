// backend/controllers/adminStoreController.js
const Store = require("../models/Store");

// ✅ Add new store
const addStore = async (req, res) => {
  try {
    const newStore = new Store({
      ...req.body,
      createdBy: req.admin.id, // store admin ID
    });

    const savedStore = await newStore.save();
    res.status(201).json({ success: true, store: savedStore });
  } catch (err) {
    res.status(500).json({ error: "Failed to add store" });
  }
};

// ✅ Get all stores added by admin
const getMyStores = async (req, res) => {
  try {
    const stores = await Store.find({ createdBy: req.admin.id });
    res.status(200).json({ success: true, stores });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stores" });
  }
};

// ✅ Update store
const updateStore = async (req, res) => {
  try {
    const updated = await Store.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.admin.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Store not found or not authorized" });
    }
    res.status(200).json({ success: true, store: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update store" });
  }
};

// ✅ Delete store
const deleteStore = async (req, res) => {
  try {
    const deleted = await Store.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.admin.id,
    });
    if (!deleted) {
      return res.status(404).json({ error: "Store not found or not authorized" });
    }
    res.status(200).json({ success: true, message: "Store deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete store" });
  }
};

// ✅ Get single store by ID
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json(store);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch store" });
  }
};

module.exports = {
  addStore,
  getMyStores,
  updateStore,
  deleteStore,
  getStoreById, // ✅ export this
};
