import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Preferences.css";

const allCategories = [
  { name: "Electronics", icon: "electronics.png" },
  { name: "Fashion", icon: "fasion.png" },
  { name: "Home", icon: "home.png" },
  { name: "Grocery", icon: "groceries.png" },
  { name: "Gym", icon: "gym.png" },
  { name: "Petrol Pump", icon: "petrol.png" },
  { name: "Cafe", icon: "cafe.png" },
  { name: "Hospital", icon: "hospital.png" },
  { name: "Hotel", icon: "hotel.png" },
  { name: "Salon", icon: "salon.png" },
  { name: "Police Station", icon: "police.png" },
  { name: "Restaurant", icon: "restaurant.png" },
  { name: "Tution", icon: "tution.png" },
];

const Preferences = () => {
  const { user } = useUser();
  const [preferences, setPreferences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/preferences/${user.id}`
        );
        const data = await res.json();
        setPreferences((data.topPreferences || []).filter(Boolean).slice(0, 5));
      } catch (err) {
        console.error("Error fetching preferences:", err);
      }
    };

    if (user?.id) fetchPreferences();
  }, [user]);

  const handleClick = (storeType) => {
    navigate(`/recommendation?storeType=${storeType}`);
  };

  const filteredCategories = allCategories.filter(cat =>
    preferences.includes(cat.name)
  );

  return (
    <div className="preferences-page">
      <h2>🧠 Your Top Searched Store Types</h2>
      <p className="subtitle">Click on a card to explore recommendations on map</p>

      <div className="preferences-grid">
        {filteredCategories.map((cat, index) => (
          <div
            key={index}
            className="preference-card"
            onClick={() => handleClick(cat.name)}
          >
            <img src={`/assets/img/${cat.icon}`} alt={cat.name} />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preferences;
