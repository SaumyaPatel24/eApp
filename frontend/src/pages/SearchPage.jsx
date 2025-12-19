import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { BASE_URL } from "../api/client";

export default function SearchPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);

  // Load all products from backend
  useEffect(() => {
    async function loadProducts() {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    }
    loadProducts();
  }, []);

  // Filter on query change
  useEffect(() => {
    if (!query || products.length === 0) return;

    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query, products]);

  return (
    <div className="p-6">
      <h2 className="text-white text-2xl font-semibold mb-4">
        Search results for "{query}"
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <ProductGrid products={results} />
      )}
    </div>
  );
}
