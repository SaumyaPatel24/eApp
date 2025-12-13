import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    gender: "Unisex",
    imageUrl: "",
    variants: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/products");
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleNewChange = (field, value) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateError("");
    setCreating(true);
    try {
      const body = {
        ...newProduct,
        price: newProduct.price ? Number(newProduct.price) : 0,
        stock: newProduct.stock ? Number(newProduct.stock) : 0,
      };
      const created = await api.post("/products", body);
      setProducts((prev) => [...prev, created]);
      setNewProduct({
        name: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        gender: "Unisex",
        imageUrl: "",
        variants: "",
      });
    } catch (err) {
      setCreateError(err.message || "Failed to create product");
    } finally {
      setCreating(false);
    }
  };

  const handleInlineChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = async (product) => {
    setSavingId(product.id);
    setError("");
    try {
      const body = {
        ...product,
        price:
          product.price !== undefined && product.price !== null
            ? Number(product.price)
            : 0,
        stock:
          product.stock !== undefined && product.stock !== null
            ? Number(product.stock)
            : 0,
      };
      const updated = await api.put(`/products/${product.id}`, body);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updated : p))
      );
    } catch (err) {
      setError(err.message || "Failed to save product");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setSavingId(id);
    setError("");
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete product");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <p className="text-slate-300 text-sm">Loading products…</p>;

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Products / Inventory</h2>
        <p className="text-sm text-slate-400">
          Manage products from the existing ecommerce backend.
        </p>
      </header>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">Create new product</h3>
        {createError && <p className="text-sm text-red-400">{createError}</p>}
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm"
        >
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => handleNewChange("name", e.target.value)}
            required
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="text"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={(e) => handleNewChange("brand", e.target.value)}
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => handleNewChange("category", e.target.value)}
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => handleNewChange("price", e.target.value)}
            required
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => handleNewChange("stock", e.target.value)}
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <select
            value={newProduct.gender}
            onChange={(e) => handleNewChange("gender", e.target.value)}
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => handleNewChange("imageUrl", e.target.value)}
            className="rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <textarea
            placeholder='Variants JSON (e.g. [{"color":"Black","sizes":[7,8]}])'
            value={newProduct.variants}
            onChange={(e) => handleNewChange("variants", e.target.value)}
            rows={2}
            className="md:col-span-2 rounded-md bg-slate-950 border border-slate-700 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <div className="flex items-center md:col-span-2">
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
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-right">Price</th>
              <th className="px-4 py-2 text-right">Stock</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t border-slate-800 hover:bg-slate-900/60"
              >
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2 font-medium text-slate-100">{p.name}</td>
                <td className="px-4 py-2 text-slate-300">{p.brand}</td>
                <td className="px-4 py-2 text-right">
                  <input
                    type="number"
                    step="0.01"
                    value={p.price}
                    onChange={(e) =>
                      handleInlineChange(p.id, "price", e.target.value)
                    }
                    className="w-24 text-right rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <input
                    type="number"
                    value={p.stock}
                    onChange={(e) =>
                      handleInlineChange(p.id, "stock", e.target.value)
                    }
                    className="w-20 text-right rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs"
                  />
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button
                    disabled={savingId === p.id}
                    onClick={() => handleSave(p)}
                    className="text-xs rounded border border-emerald-600 px-2 py-1 text-emerald-300 hover:bg-emerald-600/10 disabled:opacity-50"
                  >
                    {savingId === p.id ? "Saving…" : "Save"}
                  </button>
                  <button
                    disabled={savingId === p.id}
                    onClick={() => handleDelete(p.id)}
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
