import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api/client";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("adminUser");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token: jwt, user: u } = res;

    if (u.role !== "admin" && u.role !== "superadmin") {
      throw new Error("You are not an admin user");
    }

    // Save in state
    setUser(u);
    setToken(jwt);

    // Persist in localStorage
    localStorage.setItem("adminUser", JSON.stringify(u));
    localStorage.setItem("adminToken", jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
