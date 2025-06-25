import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home/Home";
import AddStore from "./Pages/Store/AddStore/AddStore";
import MyStores from "./Pages/Store/MyStores/MyStores";
import UpdateStore from "./Pages/Store/UpdateStore/UpdateStore";
import AboutUs from "./Pages/AboutUs/AboutUs";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addstore" element={<AddStore />} />
        <Route path="/mystore" element={<MyStores />} />
        <Route path="/updatestore/:id" element={<UpdateStore />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
