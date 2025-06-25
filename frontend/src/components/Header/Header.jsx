import React, { useState } from "react";
import "./Header.css";
import heroImg from "../../assets/img/hero.png";

const Header = ({ onProtectedSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      onProtectedSearch(searchQuery.trim().toLowerCase());
    }
  };

  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          Find the <span>Right Store</span>, <br /> Every Time.
        </h1>
        <p>Search for products, store types, or services near you.</p>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for products, stores, or categories"
          className="hero-search"
        />
      </div>
      <div className="hero-right">
        <img src={heroImg} alt="hero visual" />
      </div>
    </section>
  );
};

export default Header;
