import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const navLinkBase =
  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex w-full">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen flex flex-col">
        <div className="px-4 py-4 border-b border-slate-800">
          <h1 className="text-lg font-semibold tracking-tight">Store Admin</h1>
          <p className="text-xs text-slate-400">E‑commerce control panel</p>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? "bg-slate-800 text-white" : "text-slate-300"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? "bg-slate-800 text-white" : "text-slate-300"}`
            }
          >
            Products / Inventory
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? "bg-slate-800 text-white" : "text-slate-300"}`
            }
          >
            Customers
          </NavLink>
          <NavLink
            to="/admin-users"
            className={({ isActive }) =>
              `${navLinkBase} ${isActive ? "bg-slate-800 text-white" : "text-slate-300"}`
            }
          >
            Admin Users
          </NavLink>
        </nav>
        <div className="px-4 py-3 border-t border-slate-800 text-sm flex items-center justify-between">
          <span className="text-slate-400">
            {user ? user.email : "Admin"}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-slate-300 hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto bg-slate-950">
        {children}
      </main>
    </div>
  );
}
