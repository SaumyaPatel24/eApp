import { useEffect, useState, useMemo } from "react";
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

  // Fetch products from backend
  const loadProducts = async () => {
    const params = new URLSearchParams(
      Object.entries(filters).filter(([_, v]) => v !== "")
    ).toString();

    const data = await fetchProducts(params);
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => { loadProducts(); }, [filters]);

  // Save filters to localStorage
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

  // Generate unique filter options dynamically
  const uniqueGenders = useMemo(() => 
    [...new Set(products.map(p => p.gender))].sort(), 
    [products]
  );

  const uniqueCategories = useMemo(() => 
    [...new Set(products.map(p => p.category))].sort(), 
    [products]
  );

  const uniqueColors = useMemo(() => {
    const colors = products.flatMap(p => p.variants.map(v => v.color));
    return [...new Set(colors)].sort();
  }, [products]);

  const uniqueSizes = useMemo(() => {
    const sizes = products.flatMap(p => p.variants.map(v => v.size));
    return [...new Set(sizes)].sort((a,b) => a-b);
  }, [products]);

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-zinc-50">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">All Shoes</h1>
            <p className="text-sm text-zinc-400">Browse and filter our latest drops.</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* FILTER PANEL */}
        <div
          className={`overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 transition-all duration-300 ${
            showFilters ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center gap-4 p-4 text-sm text-zinc-200">
            
            {/* Gender Filter */}
            <select
              name="gender"
              onChange={handleFilterChange}
              value={filters.gender}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            >
              <option value="">All Genders</option>
              {uniqueGenders.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            {/* Color Filter */}
            <select
              name="color"
              onChange={handleFilterChange}
              value={filters.color}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            >
              <option value="">All Colors</option>
              {uniqueColors.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Size Filter */}
            <select
            name="size"
            onChange={handleFilterChange}
            value={filters.size}
            className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
          >
            <option value="">All Sizes</option>
            {[5,6,7,8,9,10,11,12,13].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>


            {/* Category Filter */}
            <select
              name="category"
              onChange={handleFilterChange}
              value={filters.category}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              name="sort"
              onChange={handleFilterChange}
              value={filters.sort}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
            >
              <option value="">Sort By</option>
              <option value="name_asc">Name (A–Z)</option>
              <option value="name_desc">Name (Z–A)</option>
              <option value="price_asc">Price (Low–High)</option>
              <option value="price_desc">Price (High–Low)</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="ml-auto rounded-full bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-100 hover:bg-zinc-700"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-6">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
