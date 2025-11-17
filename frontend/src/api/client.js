export const BASE_URL = "http://localhost:5000"; // backend

export async function fetchProducts(params = "") {
  const res = await fetch(`${BASE_URL}/api/products?${params}`);
  return res.json();
}
