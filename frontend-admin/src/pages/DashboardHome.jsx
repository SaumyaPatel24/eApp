import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [editStockId, setEditStockId] = useState(null);
  const [editStockValue, setEditStockValue] = useState("");
  const [addColorSizeId, setAddColorSizeId] = useState(null);
  const [newColor, setNewColor] = useState("");
  const [newSizes, setNewSizes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:8000/items/");
        const data = await res.json();
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleRemove = async (id) => {
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8000/items/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove product");
      setProducts(products.filter(p => p.id !== id));
      setMessage("Product removed successfully!");
      setConfirmId(null);
    } catch (err) {
      setMessage(err.message);
      setConfirmId(null);
    }
  };

  const handleEditStock = async (id) => {
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8000/items/${id}/stock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: parseInt(editStockValue, 10) })
      });
      if (!res.ok) throw new Error("Failed to update stock");
      setProducts(products.map(p => p.id === id ? { ...p, stock: parseInt(editStockValue, 10) } : p));
      setEditStockId(null);
      setEditStockValue("");
      setMessage("Stock updated successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleEditPrice = async (id, price) => {
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8000/items/${id}/price`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: parseFloat(price) })
      });
      if (!res.ok) throw new Error("Failed to update price");
      setProducts(products.map(p => p.id === id ? { ...p, price: parseFloat(price) } : p));
      setMessage("Price updated successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleRemoveColor = async (id, color) => {
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8000/items/${id}/color`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color })
      });
      if (!res.ok) throw new Error("Failed to remove color");
      setProducts(products.map(p => p.id === id ? { ...p, colors: p.colors.filter(c => c !== color) } : p));
      setMessage("Color removed successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleRemoveSize = async (id, size) => {
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8000/items/${id}/size`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ size })
      });
      if (!res.ok) throw new Error("Failed to remove size");
      setProducts(products.map(p => p.id === id ? { ...p, sizes: p.sizes.filter(s => s !== size) } : p));
      setMessage("Size removed successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleAddColorSize = async (id) => {
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8000/items/${id}/add-color-size`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          color: newColor,
          sizes: newSizes.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n))
        })
      });
      if (!res.ok) throw new Error("Failed to add color/size");
      setProducts(products.map(p => p.id === id ? {
        ...p,
        colors: [...(p.colors || []), newColor],
        sizes: Array.from(new Set([...(p.sizes || []), ...newSizes.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n))])),
        variants: [...(p.variants || []), { color: newColor, sizes: newSizes.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)) }]
      } : p));
      setAddColorSizeId(null);
      setNewColor("");
      setNewSizes("");
      setMessage("Color/Size added successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {message && <p className="mb-4 text-center text-green-600">{message}</p>}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Plus card for adding new product */}
          <div className="bg-white rounded shadow p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 relative" onClick={() => navigate("/add-item")}> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-green-600">
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="white" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
            </svg>
            <span className="mt-2 text-green-700 font-semibold">Add Product</span>
          </div>
          {/* Product cards */}
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onRemove={() => setConfirmId(product.id)}
              onEditStock={() => {
                setEditStockId(product.id);
                setEditStockValue(product.stock.toString());
              }}
              onEditPrice={handleEditPrice}
              onRemoveColor={handleRemoveColor}
              onRemoveSize={handleRemoveSize}
              onAddColorSize={() => setAddColorSizeId(product.id)}
            />
          ))}
        </div>
      )}
      {/* Confirm remove popup */}
      {confirmId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6">
            <p className="mb-4">Are you sure you want to remove this product?</p>
            <div className="flex gap-4 justify-end">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setConfirmId(null)}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => handleRemove(confirmId)}>Remove</button>
            </div>
          </div>
        </div>
      )}
      {/* Edit stock popup */}
      {editStockId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6">
            <p className="mb-4">Edit Stock for Product</p>
            <input type="number" value={editStockValue} onChange={e => setEditStockValue(e.target.value)} className="border px-3 py-2 rounded w-full mb-4" />
            <div className="flex gap-4 justify-end">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setEditStockId(null)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => handleEditStock(editStockId)}>Update</button>
            </div>
          </div>
        </div>
      )}
      {/* Add Color/Size popup */}
      {addColorSizeId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-6">
            <p className="mb-4">Add Color and Sizes for Product</p>
            <input type="text" value={newColor} onChange={e => setNewColor(e.target.value)} className="border px-3 py-2 rounded w-full mb-2" placeholder="Color" />
            <input type="text" value={newSizes} onChange={e => setNewSizes(e.target.value)} className="border px-3 py-2 rounded w-full mb-4" placeholder="Sizes (comma separated)" />
            <div className="flex gap-4 justify-end">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setAddColorSizeId(null)}>Cancel</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => handleAddColorSize(addColorSizeId)}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}