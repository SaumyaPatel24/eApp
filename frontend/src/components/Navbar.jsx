import logo from '../assets/images/logo.png';
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

  // ✅ Close the search popup if user clicks outside
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
    <header className="bg-white border-b shadow-sm px-6 py-3">
      <div className="flex justify-between items-center w-full">
      <NavLink to="/" className="text-xl font-semibold">
          <img 
      src={logo}
      alt="MyStore Logo" 
      className="h-20 w-auto object-contain"
      />
      </NavLink>

      <div className="w-full flex justify-end items-center gap-5 px-6 py-3">
        <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-600 hover:text-black"
          >
            <img 
              src={searchsvg}
              alt="searchlogo" 
              className="h-8 w-auto object-contain"
              />
          </button>

          {/* ✅ Popup Search Box */}
          {showSearch && (
            <div
              ref={searchRef}
              className="mx-6 flex w-1/3"
            >
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border rounded px-2 py-2"
                  autoFocus
                />
              </form>
            </div>
          )}

    <NavLink to="/cart" className={({ isActive }) =>isActive ? "text-black font-semibold": "text-gray-600 hover:text-black"}>
          <div className="relative">
  <img 
    src={cartsvg} 
    alt="Cart" 
    className="h-10 cursor-pointer"
  />

  {cart.length > 0 && (
    <span className="
      absolute -top-2 -right-2 
      bg-red-600 text-white 
      text-xs font-semibold 
      rounded-full 
      h-5 w-5 flex items-center justify-center
      shadow
    ">
      {cart.length}
    </span>
  )}
</div>
    </NavLink>

      {user ? (
            <div className="flex items-center gap-3">
              <span>Hello, {user.firstName}</span>
              <button onClick={logout} className="text-red-600">
                <img 
                  src={logoutsvg}
                  alt="logoutlogo" 
                  className="h-6 w-auto object-contain"
                  />
              </button>
            </div>
          ) : (
            <NavLink to="/signin">Sign In / Register</NavLink>
          )}

      </div>
      </div>
    </header>
  );
}

