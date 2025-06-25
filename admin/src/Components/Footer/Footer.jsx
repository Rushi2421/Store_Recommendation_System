    import React from "react";
import "./Footer.css";
import logo from "../../Assets/logo_white.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Column */}
        <div className="footer-left">
          <img src={logo} alt="logo" className="footer-logo" />
          <p>
            Our platform uses intelligent algorithms to recommend the best nearby stores based on your preferences and location. Whether you're looking for groceries, pharmacies, or unique local gems, we help you find the right place — fast and easy.
          </p>
          <div className="footer-socials">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Center Column */}
        <div className="footer-links">
          <h3>About Us</h3>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Add Store</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Column */}
        <div className="footer-contact">
          <h3>Get In Touch</h3>
          <p>+91 8421125737</p>
          <p>rrapasheanil@gmail.com</p>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>
          © 2025 Store Recommendation Engine. All rights reserved. Designed with Grace by the Store_Recommendation Team.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
