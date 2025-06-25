import { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Hero from '../../Components/Hero/Hero';
import AppPromo from '../../Components/AppPromo/AppPromo';
import LoginModal from '../../Components/Modals/LoginModal';
import RegisterModal from '../../Components/Modals/RegisterModal';

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
     

      <Hero />
      <AppPromo />

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
}

export default Home;
