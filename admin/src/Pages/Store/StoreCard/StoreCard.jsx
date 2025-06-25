const API = import.meta.env.VITE_BACKEND_URL;
import { Link } from "react-router-dom";
import axios from "axios";
import { useAdmin } from "../../../Context/AdminContext";

import "./StoreCard.css";

function StoreCard({ store, refresh }) {
  const { token } = useAdmin();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this store?")) return;

    try {
      await axios.delete(`${API}/api/admin/store/${store._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Store deleted successfully!");
      refresh(); // refresh store list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete store");
    }
  };

  return (
    <div className="store-card">
      {}
      {store.photo && store.photo.trim() !== "" && (
        <img
          src={store.photo}
          alt={store.name}
          onError={(e) => (e.target.style.display = "none")}
        />
      )}

      <h3>{store.name}</h3>
      <p>{store.address}</p>
      <p><strong>Type:</strong> {store.store_type}</p>
      <p><strong>Opens at:</strong> {store.opening_time}</p>

      <div className="store-actions">
        <Link to={`/updatestore/${store._id}`}>
          <button className="edit-btn">Update</button>
        </Link>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default StoreCard;
