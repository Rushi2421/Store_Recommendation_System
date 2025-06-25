import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyStores.css";
import StoreCard from "../../Store/StoreCard/StoreCard";

function MyStores() {
  const [stores, setStores] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/mystore", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data.stores);
    } catch (err) {
      console.error("❌ Failed to fetch stores:", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="my-stores-page">
      <button className="back-btn" onClick={() => navigate("/")}>← Back to Home</button>

      <h2>My Stores</h2>
      <p className="subtitle">Here are all the stores you've added to the system.</p>

      <div className="store-grid">
        {stores.length === 0 ? (
          <p>No stores found. Try adding one.</p>
        ) : (
          stores.map((store) => (
            <StoreCard key={store._id} store={store} refresh={fetchStores} />
          ))
        )}
      </div>
    </div>
  );
}

export default MyStores;
