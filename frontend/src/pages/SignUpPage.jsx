import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../api/client";

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Registration failed");
      }

      const data = await res.json();
      navigate("/signin");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-zinc-50">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">Create Account</h2>
      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="mb-1 block text-xs font-medium text-zinc-300">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className="w-1/2">
            <label className="mb-1 block text-xs font-medium text-zinc-300">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-300">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-300">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-zinc-300">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-orange-500 py-2 text-sm font-semibold text-black hover:bg-orange-400"
        >
          Register
        </button>
      </form>
    </div>
    </div>
  );
}
