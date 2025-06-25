import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/img/logo.png";
import LoginModal from "../../pages/auth/LoginModal";
import RegisterModal from "../../pages/Auth/RegisterModal";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="Store Logo" className="navbar-logo" />
          </Link>
        </div>

        <div className="navbar-right">
          <Link to="/about">About Us</Link>
          {user && <Link to="/preferences">Preferences</Link>}
          <Link to="">Mobile App</Link>

          {!user ? (
            <>
              <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
              <button className="signup-btn" onClick={() => setShowRegister(true)}>Sign Up</button>
            </>
          ) : (
            <button className="logout-btn" onClick={logout}>Logout</button>
          )}
        </div>
      </nav>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
};

export default Navbar;
