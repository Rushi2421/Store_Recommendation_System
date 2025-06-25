import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Recommendation from "./pages/Recommendation/Recommendation";
import Preferences from "./pages/Preferences/Preferences";
import AboutUs from "./pages/AboutUs/AboutUs";


const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/about" element={<AboutUs />} />
       
      </Routes>

      <Footer />
    </>
  );
};

export default App;
