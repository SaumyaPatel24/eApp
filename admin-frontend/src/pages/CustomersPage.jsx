import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function CustomersPage() {
  const { token } = useAdminAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/admin/users", { token });
        setCustomers(data);
      } catch (err) {
        setError(err.message || "Failed to load customers");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const selectCustomer = async (id) => {
    setSelectedId(id);
    setDetail(null);
    setDetailError("");
    setDetailLoading(true);
    setOrders([]);
    setOrdersError("");
    setOrdersLoading(true);
    try {
      const data = await api.get(`/admin/users/${id}`, { token });
      setDetail(data);
    } catch (err) {
      setDetailError(err.message || "Failed to load customer details");
    } finally {
      setDetailLoading(false);
    }

    try {
      const ord = await api.get(`/admin/users/${id}/orders`, { token });
      setOrders(ord);
    } catch (err) {
      setOrdersError(err.message || "Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  if (loading) return <p className="text-sm text-slate-300">Loading customers…</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <section className="lg:col-span-1 rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden">
        <header className="px-4 py-3 border-b border-slate-800">
          <h2 className="text-sm font-semibold text-slate-200">Customers</h2>
          <p className="text-xs text-slate-400">Click a customer to view details.</p>
        </header>
        <ul className="divide-y divide-slate-800 max-h-[32rem] overflow-y-auto text-sm">
          {customers.map((c) => (
            <li
              key={c.id}
              onClick={() => selectCustomer(c.id)}
              className={`px-4 py-2 cursor-pointer hover:bg-slate-800/60 ${
                selectedId === c.id ? "bg-slate-800/80" : ""
              }`}
            >
              <p className="font-medium text-slate-100">
                {c.firstName} {c.lastName}
              </p>
              <p className="text-xs text-slate-400">{c.email}</p>
              <p className="text-xs text-slate-500 mt-0.5">Role: {c.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="lg:col-span-2 space-y-4">
        {!selectedId && (
          <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-6 text-sm text-slate-400">
            Select a customer on the left to see profile and activity.
          </div>
        )}

        {selectedId && (
          <div className="space-y-4">
            {detailLoading && (
              <p className="text-sm text-slate-300">Loading customer details…</p>
            )}
            {detailError && (
              <p className="text-sm text-red-400">{detailError}</p>
            )}

            {detail && (
              <>
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm space-y-1">
                  <h2 className="text-lg font-semibold text-slate-100">
                    {detail.user.firstName} {detail.user.lastName}
                  </h2>
                  <p className="text-slate-300">{detail.user.email}</p>
                  {detail.user.phone && (
                    <p className="text-slate-400 text-xs">Phone: {detail.user.phone}</p>
                  )}
                  <p className="text-slate-400 text-xs">Role: {detail.user.role}</p>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm space-y-2">
                  <h3 className="text-sm font-semibold text-slate-200">Reviews / Activity</h3>
                  {detail.reviews.length === 0 && (
                    <p className="text-xs text-slate-500">
                      This customer has not left any reviews yet.
                    </p>
                  )}
                  {detail.reviews.length > 0 && (
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                      {detail.reviews.map((r) => (
                        <li
                          key={r.id}
                          className="rounded-md border border-slate-800 bg-slate-950/60 p-2"
                        >
                          <p className="text-xs text-slate-400 mb-1">
                            Product: <span className="text-slate-200">{r.Product?.name}</span>{" "}
                            <span className="text-slate-500">
                              ({r.Product?.brand} · {r.Product?.category})
                            </span>
                          </p>
                          <p className="text-xs text-yellow-400 mb-0.5">Rating: {r.rating}/5</p>
                          <p className="text-xs text-slate-300">{r.comment}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm space-y-2">
                  <h3 className="text-sm font-semibold text-slate-200">Orders</h3>
                  {ordersLoading && (
                    <p className="text-xs text-slate-300">Loading orders…</p>
                  )}
                  {ordersError && (
                    <p className="text-xs text-red-400">{ordersError}</p>
                  )}
                  {!ordersLoading && !ordersError && orders.length === 0 && (
                    <p className="text-xs text-slate-500">
                      This customer has no recorded orders yet.
                    </p>
                  )}
                  {orders.length > 0 && (
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                      {orders.map((o) => (
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
                                  <span>
                                    {item.Product?.name || "Product"} × {item.quantity}
                                  </span>
                                  <span>
                                    ${item.price} each
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
