import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null); // ✅ add token state

  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem('admin');
      const storedToken = localStorage.getItem('adminToken');

      if (storedAdmin && storedAdmin !== "undefined") {
        setAdmin(JSON.parse(storedAdmin));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (e) {
      console.error("❌ Failed to load admin from localStorage:", e);
      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');
    }
  }, []);

  const login = (adminData, jwtToken) => {
    setAdmin(adminData);
    setToken(jwtToken);
    localStorage.setItem('admin', JSON.stringify(adminData));
    localStorage.setItem('adminToken', jwtToken); // ✅ save token
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
