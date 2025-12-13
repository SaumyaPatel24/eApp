import { createContext, useContext, useState } from "react";
import { api } from "../api/client";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token: jwt, user: u } = res;
    if (u.role !== "admin" && u.role !== "superadmin") {
      throw new Error("You are not an admin user");
    }
    setUser(u);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
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
