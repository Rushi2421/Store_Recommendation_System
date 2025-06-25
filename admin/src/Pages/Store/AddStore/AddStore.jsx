import { useState } from "react";
import axios from "axios";
import "./AddStore.css";

function AddStore() {
  const [formData, setFormData] = useState({
    name: "", area: "", address: "", phone: "", rating: "",
    total_reviews: "", store_type: "", opening_time: "",
    pincode: "", latitude: "", longitude: "", city: "", photo: ""
  });

  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("adminToken");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select an image.");

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "store_uploads");
    data.append("folder", "admin_uploads");

    setUploading(true);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dnxabw1uf/image/upload",
        data
      );
      setFormData(prev => ({ ...prev, photo: res.data.secure_url }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("❌ Image upload failed. Check Cloudinary setup.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/addstore", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Store added!");
      setFormData({
        name: "", area: "", address: "", phone: "", rating: "",
        total_reviews: "", store_type: "", opening_time: "",
        pincode: "", latitude: "", longitude: "", city: "", photo: ""
      });
    } catch {
      alert("❌ Failed to add store");
    }
  };

  return (
    <div className="add-store-page">
      <h2 className="center-title">Add New Store</h2>
      <p className="center-subtitle">Enter all details including photo</p>
      <div className="form-wrapper">
        <form className="add-store-form" onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) =>
            key !== "photo" && (
              <input key={key} name={key} placeholder={key.replace("_", " ").toUpperCase()} value={value} onChange={handleChange} required />
            )
          )}

          <label className="file-label">
            Upload Photo:
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          {uploading ? <p>Uploading...</p> : formData.photo && (
            <div className="image-preview">
              <img src={formData.photo} alt="Preview" />
            </div>
          )}

          <button type="submit" className="submit-store-btn">Add Store</button>
        </form>
      </div>
    </div>
  );
}

export default AddStore;
