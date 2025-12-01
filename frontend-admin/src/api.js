const API_BASE = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:8001';

export async function login(username, password) {
  const form = new URLSearchParams();
  form.append('username', username);
  form.append('password', password);

  const res = await fetch(`${API_BASE}/token`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function me(token) {
  const res = await fetch(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Not authorized');
  return res.json();
}

export function saveToken(token) {
  localStorage.setItem('admin_token', token);
}

export function getToken() {
  return localStorage.getItem('admin_token');
}

export function logout() {
  localStorage.removeItem('admin_token');
}
