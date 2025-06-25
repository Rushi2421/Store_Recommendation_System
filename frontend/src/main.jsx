import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import 'leaflet/dist/leaflet.css';
 // ✅ Import UserProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* ✅ Wrap App with UserProvider */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
