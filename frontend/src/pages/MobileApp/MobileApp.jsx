import React from "react";
import "./MobileApp.css";

const MobileApp = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Store Recommendation Engine</h1>
        <p>Your one-stop platform to discover the best stores nearby.</p>
      </div>

      <div className="about-section mission">
        <h2>🚀 Our Mission</h2>
        <p>
          We aim to simplify your shopping journey by recommending stores tailored to your needs,
          location, and preferences. Whether you're looking for a hospital, salon, or the nearest café—
          we’ve got you covered.
        </p>
      </div>

      <div className="about-section features">
        <h2>🔍 Why Choose Us</h2>
        <ul>
          <li>✅ Real-time location-based store suggestions</li>
          <li>✅ Personalized recommendations based on past searches</li>
          <li>✅ Seamless user and business interfaces</li>
          <li>✅ Route guidance and store mapping with MapLibre</li>
          <li>✅ Lightweight and fast interface powered by ML</li>
        </ul>
      </div>

      <div className="about-section team">
        <h2>👥 Meet Our Team</h2>
        <p>
          We are a team of passionate developers, designers, and data enthusiasts who believe in
          building simple solutions for complex problems. This platform is the result of countless
          hours of planning, coding, and testing.
        </p>
      </div>

      <div className="about-section contact">
        <h2>📬 Get in Touch</h2>
        <p>Have suggestions or feedback? We’d love to hear from you!</p>
        <p>
          ✉️ Email us at: <strong>support@storerecommend.in</strong>
        </p>
      </div>
    </div>
  );
};

export default MobileApp;
