import React, { useState } from "react";
import Header from "../../components/Header/Header";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";
import AppPromo from "../../components/AppPromo/AppPromo"; // ✅ AppPromo added
import LoginModal from "../auth/LoginModal";
import { useUser } from "../../context/UserContext";

const Home = () => {
  const { user } = useUser();
  const [showLogin, setShowLogin] = useState(false);

  const handleSearchProtected = (storeType) => {
    if (!user) {
      setShowLogin(true);
    } else {
      window.location.href = `/recommendation?storeType=${encodeURIComponent(storeType)}`;
    }
  };

  return (
    <>
      <Header onProtectedSearch={handleSearchProtected} />
      <CategoryGrid onProtectedClick={handleSearchProtected} />
      <AppPromo /> {/* ✅ Rendered at the bottom */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Home;
