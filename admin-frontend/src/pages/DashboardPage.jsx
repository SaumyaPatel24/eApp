import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function DashboardPage() {
  const { token } = useAdminAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/admin/summary", { token });
        setSummary(data);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (loading) {
    return <p className="text-sm text-slate-300">Loading dashboard…</p>;
  }

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  const totalSales = summary?.totalSales ?? 0;
  const orders = summary?.orders ?? 0;
  const users = summary?.users ?? 0;
  const recentOrders = summary?.recentOrders ?? [];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-sm text-slate-400">
          High‑level overview of sales and store activity.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase text-slate-400">Total Sales</p>
          <p className="mt-2 text-2xl font-semibold">${totalSales.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase text-slate-400">Orders</p>
          <p className="mt-2 text-2xl font-semibold">{orders}</p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs uppercase text-slate-400">Customers</p>
          <p className="mt-2 text-2xl font-semibold">{users}</p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm space-y-2">
        <h3 className="text-sm font-semibold text-slate-200">Recent Orders</h3>
        {recentOrders.length === 0 && (
          <p className="text-xs text-slate-500">No orders yet.</p>
        )}
        {recentOrders.length > 0 && (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {recentOrders.map((o) => (
              <li
                key={o.id}
                className="rounded-md border border-slate-800 bg-slate-950/60 p-2 space-y-1"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Order #{o.id}</span>
                  <span className="text-slate-400">Status: {o.status}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Total: <span className="text-slate-200">${o.total}</span>
                  </span>
                  {o.createdAt && (
                    <span>
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {o.OrderItems && o.OrderItems.length > 0 && (
                  <ul className="mt-1 space-y-1 text-xs text-slate-300">
                    {o.OrderItems.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.Product?.name || "Product"} × {item.quantity}</span>
                        <span>${item.price} each</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
