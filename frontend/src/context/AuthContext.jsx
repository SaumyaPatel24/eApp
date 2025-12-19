import { createContext, useContext, useState } from "react";
import { useCart } from "./CartContext";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const { reloadCartForUser } = useCart();

  // login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    reloadCartForUser(userData);
  };

  // logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    reloadCartForUser(null);
  };

  // update
  const updateUser = (newData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
