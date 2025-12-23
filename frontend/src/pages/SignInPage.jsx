import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../api/client";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await res.json();

      // save token locally
      localStorage.setItem("token", data.token);
      const from = location.state?.from || "/";
      login(data.user);
      navigate(from, { replace: true });

    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-zinc-50">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">Sign In</h2>

      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-300">Email</label>
          <input
            type="email"
            name="email"
            className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-300">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-orange-500 py-2 text-sm font-semibold text-black hover:bg-orange-400"
        >
          Sign In
        </button>
      </form>

      {/* Register link */}
      <div className="mt-4 text-center text-sm">
        <p className="text-zinc-400">
          New here?{" "}
          <Link to="/signup" className="text-orange-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}
