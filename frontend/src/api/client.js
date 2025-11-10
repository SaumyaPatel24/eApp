export const BASE_URL = "http://localhost:5000"; // backend

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/api/products`);
  return res.json();
}
