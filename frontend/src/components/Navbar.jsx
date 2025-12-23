// final code
import textlogo from '../assets/images/textlogo.svg';
import cartsvg from "../assets/images/cartsvg.svg";
import logoutsvg from "../assets/images/logoutsvg.svg";
import searchsvg from "../assets/images/searchsvg.svg";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length === 0) return;

    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    setShowSearch(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img
            src={textlogo}
            alt="MyStore Logo"
            className="h-17 w-auto object-contain"
          />
        </NavLink>

        {/* Right side actions */}
        <div className="flex items-center gap-4">

          {/* Search button / input */}
          <div className="flex items-center gap-2" ref={searchRef}>
            {!showSearch && (
              <button
                onClick={() => setShowSearch(true)}
                className="relative flex items-center rounded-full bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-100 ring-1 ring-zinc-800 hover:bg-zinc-800"
              >
                <img src={searchsvg} alt="Search" className="h-7 w-7" />
              </button>
            )}

            {showSearch && (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-52 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  autoFocus
                />
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setShowSearch(false)}
                  className="flex items-center justify-center rounded-full bg-zinc-900 p-2 text-zinc-300 ring-1 ring-zinc-800 hover:bg-zinc-800 hover:text-white"
                >
                  ✕
                </button>
              </form>
            )}
          </div>

          {/* Cart button */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center rounded-full bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-100 ring-1 ring-zinc-800 hover:bg-zinc-800 ${
                isActive ? "ring-orange-500" : ""
              }`
            }
          >
            <img src={cartsvg} alt="Cart" className="h-7 w-7" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-semibold text-black">
                {cart.length}
              </span>
            )}
          </NavLink>

          {/* User / Logout */}
          {user ? (
      <div className="flex items-center gap-3">
        {/* Username */}
        <span
          onClick={() => navigate("/profile")}
          className="hidden text-sm text-orange-400 sm:inline cursor-pointer hover:underline"
        >
          Hello, {user.firstName}
        </span>

        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center justify-center rounded-full bg-zinc-900 p-2 text-red-400 ring-1 ring-zinc-800 hover:bg-zinc-800"
        >
          <img
            src={logoutsvg}
            alt="logoutlogo"
            className="h-7 w-7 object-contain"
          />
        </button>
      </div>
      ) :  (
            <NavLink
              to="/signin"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-zinc-100"
            >
              Sign In / Register
            </NavLink>
          )}

        </div>
      </div>
    </header>
  );
}
