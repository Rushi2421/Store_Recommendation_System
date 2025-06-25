import React from "react";
import "./CategoryGrid.css";
import { categoryIcons } from "../../assets/assets";

const categories = [
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
  { name: "Tution", icon: "tution.png" }
];

const CategoryGrid = ({ onProtectedClick }) => {
  return (
    <section className="category-section">
      <h2>Categories</h2>
      <div className="category-grid">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="category-card"
            onClick={() => onProtectedClick(cat.name)}
          >
            <div className="category-icon">
              <img src={categoryIcons[cat.icon]} alt={cat.name} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
