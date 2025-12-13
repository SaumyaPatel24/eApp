const BASE_URL = "http://localhost:5000/api";

async function request(path, options = {}) {
  const { token, ...rest } = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(rest.headers || {}),
    },
    ...rest,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

export const api = {
  get: (path, opts) => request(path, opts),
  post: (path, body, opts) => request(path, { method: "POST", body: JSON.stringify(body), ...(opts || {}) }),
  put: (path, body, opts) => request(path, { method: "PUT", body: JSON.stringify(body), ...(opts || {}) }),
  patch: (path, body, opts) => request(path, { method: "PATCH", body: JSON.stringify(body), ...(opts || {}) }),
  delete: (path, opts) => request(path, { method: "DELETE", ...(opts || {}) }),
};
