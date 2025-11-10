import { createContext, useContext, useState, useEffect } from "react";
import { useCart } from "./CartContext";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const { reloadCartForUser } = useCart();

  // ✅ Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ Sync the correct cart
    reloadCartForUser(userData);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);

    // ✅ Switch back to guest cart
    reloadCartForUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
