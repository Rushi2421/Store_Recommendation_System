const API = import.meta.env.VITE_BACKEND_URL;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateStore.css";

function UpdateStore() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [store, setStore] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/store/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStore(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
        alert("❌ Failed to load store");
      }
    };
    fetchStore();
  }, [id, token]);

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
      alert("❌ Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/admin/store/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Store updated successfully!");
      navigate("/mystore");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update store");
    }
  };

  if (!store) return <p className="loading-text">Loading store data...</p>;

  return (
    <div className="update-store-page">
      <button className="back-btn" onClick={() => navigate("/mystore")}>← Back to My Stores</button>
      <h2>Update Store</h2>

      <form className="update-store-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Store Name" required />
        <input name="area" value={formData.area || ""} onChange={handleChange} placeholder="Area" required />
        <input name="address" value={formData.address || ""} onChange={handleChange} placeholder="Address" required />
        <input name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Phone" required />
        <input name="rating" value={formData.rating || ""} onChange={handleChange} placeholder="Rating" />
        <input name="total_reviews" value={formData.total_reviews || ""} onChange={handleChange} placeholder="Total Reviews" />
        <input name="store_type" value={formData.store_type || ""} onChange={handleChange} placeholder="Store Type" />
        <input name="opening_time" value={formData.opening_time || ""} onChange={handleChange} placeholder="Opening Time" />
        <input name="pincode" value={formData.pincode || ""} onChange={handleChange} placeholder="Pincode" />
        <input name="latitude" value={formData.latitude || ""} onChange={handleChange} placeholder="Latitude" />
        <input name="longitude" value={formData.longitude || ""} onChange={handleChange} placeholder="Longitude" />
        <input name="city" value={formData.city || ""} onChange={handleChange} placeholder="City" />

        <label>
          Upload New Photo:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        {uploading && <p>Uploading image...</p>}
        {formData.photo && (
          <div className="image-preview">
            <img src={formData.photo} alt="Store" onError={(e) => (e.target.style.display = "none")} />
          </div>
        )}

        <button type="submit" className="update-btn">Update Store</button>
      </form>
    </div>
  );
}

export default UpdateStore;
