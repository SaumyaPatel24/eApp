import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminUsersPage() {
  const { token, user } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "admin",
  });

  const isSuperadmin = user?.role === "superadmin";

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/admin/users", { token });
        setUsers(data);
      } catch (err) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const updateRole = async (id, role) => {
    setSavingId(id);
    setError("");
    try {
      const updated = await api.patch(
        `/admin/users/${id}/role`,
        { role },
        { token }
      );
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: updated.role } : u)));
    } catch (err) {
      setError(err.message || "Failed to update role");
    } finally {
      setSavingId(null);
    }
  };

  const deleteUserById = async (id) => {
    setSavingId(id);
    setError("");
    try {
      await api.delete(`/admin/users/${id}`, { token });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete user");
    } finally {
      setSavingId(null);
    }
  };

  const handleCreateChange = (field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateError("");
    setCreating(true);
    try {
      const created = await api.post(
        "/admin/users",
        {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
        },
        { token }
      );
      setUsers((prev) => [...prev, created]);
      setNewUser({ firstName: "", lastName: "", email: "", password: "", role: "admin" });
    } catch (err) {
      setCreateError(err.message || "Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  if (!isSuperadmin) {
    return (
      <p className="text-sm text-slate-400">
        Only <span className="font-mono">superadmin</span> users can manage other admins.
      </p>
    );
  }

  if (loading) return <p className="text-sm text-slate-300">Loading users…</p>;

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Admin Users</h2>
        <p className="text-sm text-slate-400">
          As superadmin, you can create new admin or superadmin accounts and
          promote, demote, or remove existing users.
        </p>
      </header>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">Create new admin user</h3>
        {createError && <p className="text-sm text-red-400">{createError}</p>}
        <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
          <input
            type="text"
            placeholder="First name"
            value={newUser.firstName}
            onChange={(e) => handleCreateChange("firstName", e.target.value)}
            required
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="text"
            placeholder="Last name"
            value={newUser.lastName}
            onChange={(e) => handleCreateChange("lastName", e.target.value)}
            required
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => handleCreateChange("email", e.target.value)}
            required
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => handleCreateChange("password", e.target.value)}
            required
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <div className="flex gap-2 items-center">
            <select
              value={newUser.role}
              onChange={(e) => handleCreateChange("role", e.target.value)}
              className="flex-1 rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
            <button
              type="submit"
              disabled={creating}
              className="rounded-md bg-sky-600 hover:bg-sky-500 disabled:opacity-60 px-3 py-2 text-xs font-medium"
            >
              {creating ? "Creating…" : "Create"}
            </button>
          </div>
        </form>
      </section>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/80 text-slate-400 text-xs uppercase">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-800">
                <td className="px-4 py-2">{u.id}</td>
                <td className="px-4 py-2">{u.firstName} {u.lastName}</td>
                <td className="px-4 py-2 text-slate-200">{u.email}</td>
                <td className="px-4 py-2 text-slate-300">{u.role}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button
                    disabled={savingId === u.id}
                    onClick={() => updateRole(u.id, "customer")}
                    className="text-xs rounded border border-slate-700 px-2 py-1 text-slate-300 hover:bg-slate-800 disabled:opacity-50"
                  >
                    Customer
                  </button>
                  <button
                    disabled={savingId === u.id}
                    onClick={() => updateRole(u.id, "admin")}
                    className="text-xs rounded border border-emerald-600 px-2 py-1 text-emerald-300 hover:bg-emerald-600/10 disabled:opacity-50"
                  >
                    Admin
                  </button>
                  <button
                    disabled={savingId === u.id}
                    onClick={() => updateRole(u.id, "superadmin")}
                    className="text-xs rounded border border-sky-600 px-2 py-1 text-sky-300 hover:bg-sky-600/10 disabled:opacity-50"
                  >
                    Superadmin
                  </button>
                  <button
                    disabled={savingId === u.id}
                    onClick={() => deleteUserById(u.id)}
                    className="text-xs rounded border border-red-600 px-2 py-1 text-red-300 hover:bg-red-600/10 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
