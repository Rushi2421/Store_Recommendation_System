// src/pages/Auth/RegisterModal.jsx
const API = import.meta.env.VITE_BACKEND_URL;

import { useState } from "react";
import axios from "axios";
import { useAdmin } from "../../Context/AdminContext"; // ✅ context
import "./Modal.css";

function RegisterModal({ onClose }) {
  const { login } = useAdmin(); // ✅ get context login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API}/api/admin/register`, {
        name,
        email,
        password,
      });

      // ✅ Save token and set context
      localStorage.setItem("adminToken", res.data.token);
      login(res.data.admin); // updates AdminContext

      alert("✅ Admin registered successfully!");
      onClose(); // ✅ close modal
    } catch (err) {
      console.error("Registration error:", err);
      alert("❌ Failed to register admin.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <button className="btn-close" onClick={onClose}>×</button>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn-orange" onClick={handleRegister}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default RegisterModal;
