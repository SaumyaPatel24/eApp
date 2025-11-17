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
    <header className="bg-black border-b shadow-sm py-3 px-6 flex items-center justify-center relative sticky top-0 left-0 w-full z-50">
     <div className="flex justify-center w-1/3 absolute left-1/2 transform -translate-x-1/2">
      <NavLink to="/" className="flex items-center justify-center">
        <img
          src={textlogo}
          alt="MyStore Logo"
          className="h-25 object-contain"
        />
      </NavLink>
    </div>
      <div className="w-full flex justify-end items-center gap-5 px-6 py-3">
          {!showSearch && (
            <button
              onClick={() => setShowSearch(true)}
              className="text-gray-600 hover:text-black"
            >
              <img 
                src={searchsvg}
                alt="searchlogo" 
                className="h-15 w-auto object-contain"
              />
            </button>
          )}
          {showSearch && (
            <div
              ref={searchRef}
              className="mx-6 flex w-1/10"
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
    className="h-15 cursor-pointer"
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
              <span className="text-orange-400">Hello, {user.firstName}</span>
              <button onClick={logout} className="text-red-600">
                <img 
                  src={logoutsvg}
                  alt="logoutlogo" 
                  className="h-15 w-auto object-contain"
                  />
              </button>
            </div>
          ) : (
            <NavLink to="/signin">Sign In / Register</NavLink>
          )}

      </div>
    </header>
  );
}

