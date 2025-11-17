import { useEffect, useState } from "react";
import { fetchProducts } from "../api/client";
import ProductGrid from "../components/ProductGrid";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState(() => {
    return JSON.parse(localStorage.getItem("catalogFilters")) || {
      gender: "",
      color: "",
      size: "",
      category: "",
      sort: "",
      search: "",
    };
  });

  // Fetch products
  const loadProducts = async () => {
    const params = new URLSearchParams(
      Object.entries(filters).filter(([_, v]) => v !== "")
    ).toString();

    const data = await fetchProducts(params);
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => { loadProducts(); }, [filters]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("catalogFilters", JSON.stringify(filters));
  }, [filters]);

  // Universal filter change handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    const empty = {
      gender: "",
      color: "",
      size: "",
      category: "",
      sort: "",
      search: "",
    };
    setFilters(empty);
    localStorage.setItem("catalogFilters", JSON.stringify(empty));
  };

  return (
    <div className="bg-black rounded-xl min-h-screen px-0 py-0">

      <div className=" flex justify-between rounded-xl items-center mb-5 bg-orange-500 sticky top-27 z-20 py-3">
        <h1 className="text-2xl text-black font-bold">All Shoes</h1>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

      {/* ⭐ FILTER PANEL (animated) */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-wrap items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm">

          <select
            name="gender"
            onChange={handleFilterChange}
            value={filters.gender}
            className="border p-2 rounded"
          >
            <option value="">All Genders</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>

          <select
            name="color"
            onChange={handleFilterChange}
            value={filters.color}
            className="border p-2 rounded"
          >
            <option value="">All Colors</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
          </select>

          <select
            name="size"
            onChange={handleFilterChange}
            value={filters.size}
            className="border p-2 rounded"
          >
            <option value="">All Sizes</option>
            {[6, 7, 8, 9, 10, 11].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            name="category"
            onChange={handleFilterChange}
            value={filters.category}
            className="border p-2 rounded"
          >
            <option value="">All Types</option>
            <option value="Running">Running</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Gym">Gym</option>
            <option value="Hiking">Hiking</option>
            <option value="Slides">Slides</option>
          </select>

          <select
            name="sort"
            onChange={handleFilterChange}
            value={filters.sort}
            className="border p-2 rounded"
          >
            <option value="">Sort By</option>
            <option value="name_asc">Name (A–Z)</option>
            <option value="name_desc">Name (Z–A)</option>
            <option value="price_asc">Price (Low–High)</option>
            <option value="price_desc">Price (High–Low)</option>
          </select>

          <button
            onClick={resetFilters}
            className="ml-auto text-sm bg-gray-200 hover:bg-gray-300 rounded px-3 py-2"
          >
            Reset Filters
          </button>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <ProductGrid products={products} />
    </div>
  );
}
