const API = import.meta.env.VITE_BACKEND_URL;
import { useState } from "react";
import axios from "axios";
import "./Modal.css";
import { useAdmin } from "../../Context/AdminContext";

function LoginModal({ onClose }) {
  const { login } = useAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/api/admin/login`, {
        email,
        password,
      });

      // ✅ Pass both admin info and token to login context
      login(response.data.admin, response.data.token);

      alert("✅ Login successful!");
      onClose(); // close modal after successful login
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <button className="btn-close" onClick={onClose}>×</button>
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

          <button className="btn-orange" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
