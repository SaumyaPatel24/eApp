import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function LoginPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Admin Login</h2>
          <p className="text-sm text-slate-400">
            Sign in with an account whose role is <span className="font-mono">admin</span> or
            <span className="font-mono"> superadmin</span>.
          </p>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-md bg-sky-600 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed px-3 py-2 text-sm font-medium"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
