import logo from '../assets/images/logo.png';
import cartsvg from "../assets/images/cartsvg.svg";
import logoutsvg from "../assets/images/logoutsvg.svg";
import searchsvg from "../assets/images/searchsvg.svg";

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from "react";
// Remove cart and user context for admin panel
export default function Navbar() {
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
    <header className="bg-white border-b shadow-sm px-6 py-3">
      <div className="flex justify-between items-center w-full">
        <NavLink to="/" className="text-xl font-semibold">
          <img 
            src={logo}
            alt="Admin Logo" 
            className="h-20 w-auto object-contain"
          />
        </NavLink>
        <div className="w-full flex justify-end items-center gap-5 px-6 py-3">
          {/* Admin panel can add more controls here */}
        </div>
      </div>
    </header>
  );
}
