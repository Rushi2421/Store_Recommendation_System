// src/Components/Hero/Hero.jsx
import './Hero.css';
import storeImage from '../../Assets/hero.png';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>
          Welcome to the <span className="highlight">Admin</span>, <br /> Dashboard
        </h1>
        <p>Manage, update, and keep your store listings fresh and accurate.</p>

        <div className="hero-buttons">
          <button className="admin-btn" onClick={() => navigate('/addstore')}>Add Store</button>
          
          <button className="admin-btn" onClick={() => navigate('/mystore')}>My Stores</button>
        </div>
      </div>

      <div className="hero-image">
        <img src={storeImage} alt="Store illustration" />
      </div>
    </section>
  );
}

export default Hero;
