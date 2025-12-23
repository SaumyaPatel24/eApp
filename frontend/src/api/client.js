export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // backend

export async function fetchProducts(params = "") {
  const res = await fetch(`${BASE_URL}/api/products?${params}`);
  return res.json();
}
