import React, { useState } from "react";
import "./AuthModal.css";
import API from "../../utils/api";
import { useUser } from "../../context/UserContext";

const LoginModal = ({ onClose }) => {
  const { login } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/user/login", formData);
      login(res.data.user, res.data.token);
      onClose();
    } catch (err) {
      console.error("Login error:", err.response?.data?.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-modal">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
