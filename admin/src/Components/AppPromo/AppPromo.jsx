import React from "react";
import "./AppPromo.css";
import playstore from "../../assets/mob1.png";
import appstore from "../../assets/mob2.png";

const AppPromo = () => {
  return (
    <section className="app-promo">
      <h2>For Better experience Download</h2>
      <h3>Our App</h3>
      <div className="app-buttons">
        <img src={playstore} alt="Get it on Google Play" />
        <img src={appstore} alt="Download on the App Store" />
      </div>
    </section>
  );
};

export default AppPromo;
