import { useEffect, useState } from "react";
import { fetchProducts } from "../api/client";
import ProductGrid from "../components/ProductGrid";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return <ProductGrid products={products} />;
}
