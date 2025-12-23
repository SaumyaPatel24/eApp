const BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : "http://localhost:3001/api";

async function request(path, options = {}) {
  const token =
    options.token || localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json")
    ? res.json()
    : res.text();
}


export const api = {
  get: (path, opts) => request(path, opts),
  post: (path, body, opts) => request(path, { method: "POST", body: JSON.stringify(body), ...(opts || {}) }),
  put: (path, body, opts) => request(path, { method: "PUT", body: JSON.stringify(body), ...(opts || {}) }),
  patch: (path, body, opts) => request(path, { method: "PATCH", body: JSON.stringify(body), ...(opts || {}) }),
  delete: (path, opts) => request(path, { method: "DELETE", ...(opts || {}) }),
};
