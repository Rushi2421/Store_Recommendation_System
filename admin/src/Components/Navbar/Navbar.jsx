// src/Components/Navbar/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Assets/logo.png';
import LoginModal from '../../Components/Modals/LoginModal';
import RegisterModal from '../../Components/Modals/RegisterModal';
import { useAdmin } from '../../Context/AdminContext';

function Navbar() {
  const { admin, logout } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="admin-navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="Store Logo" className="logo" />
          </Link>
        </div>

        <div className="navbar-right">
          <div className="navbar-links">
            <Link to="/about">About Us</Link>
            <Link to="/app">Mobile App</Link>
          </div>

          {!admin ? (
            <>
              <button className="btn-outline" onClick={() => setShowLogin(true)}>Login</button>
              <button className="btn-outline" onClick={() => setShowRegister(true)}>Sign Up</button>
            </>
          ) : (
            <>
              <span className="admin-name">Hi, {admin?.name}</span>
              <button className="btn-outline" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}

export default Navbar;
