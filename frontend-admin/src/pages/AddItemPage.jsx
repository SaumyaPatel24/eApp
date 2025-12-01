import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddItemPage() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Shoes",
    price: "",
    stock: "",
    rating: "N/A",
    imageUrl: "",
  });
  const [colorSizeRows, setColorSizeRows] = useState([
    { color: "", sizes: "" }
  ]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRowChange = (idx, field, value) => {
    const updated = colorSizeRows.map((row, i) =>
      i === idx ? { ...row, [field]: value } : row
    );
    setColorSizeRows(updated);
  };

  const addRow = () => {
    setColorSizeRows([...colorSizeRows, { color: "", sizes: "" }]);
  };

  const removeRow = (idx) => {
    setColorSizeRows(colorSizeRows.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // Build colors, sizes, variants
    const colors = colorSizeRows.map(row => row.color).filter(Boolean);
    const sizes = Array.from(new Set(colorSizeRows.flatMap(row => row.sizes.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)))));
    const variants = colorSizeRows
      .filter(row => row.color && row.sizes)
      .map(row => ({
        color: row.color,
        sizes: row.sizes.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n))
      }));
    try {
      const res = await fetch("http://localhost:8001/items/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          brand: form.brand,
          category: form.category,
          price: parseFloat(form.price),
          rating: form.rating === "N/A" ? null : parseFloat(form.rating),
          stock: parseInt(form.stock, 10),
          imageUrl: form.imageUrl,
          colors,
          sizes,
          variants
        })
      });
      if (!res.ok) throw new Error("Failed to add item");
      setMessage("Item added successfully!");
      setForm({
        name: "",
        brand: "",
        category: "Shoes",
        price: "",
        stock: "",
        rating: "N/A",
        imageUrl: "",
      });
      setColorSizeRows([{ color: "", sizes: "" }]);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow relative">
      {/* Cross button to go back */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        title="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="white" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
        </svg>
      </button>
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Brand</label>
          <input type="text" name="brand" value={form.brand} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="Shoes">Shoes</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <div className="flex items-center">
            <span className="mr-2 text-gray-500">$</span>
            <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <input type="text" name="rating" value={form.rating} onChange={handleChange} className="w-full border px-3 py-2 rounded" placeholder="N/A" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Colors & Sizes</label>
          {colorSizeRows.map((row, idx) => (
            <div key={idx} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Color"
                value={row.color}
                onChange={e => handleRowChange(idx, "color", e.target.value)}
                className="border px-3 py-2 rounded w-1/2"
                required
              />
              <input
                type="text"
                placeholder="Sizes (comma separated)"
                value={row.sizes}
                onChange={e => handleRowChange(idx, "sizes", e.target.value)}
                className="border px-3 py-2 rounded w-1/2"
                required
              />
              {colorSizeRows.length > 1 && (
                <button type="button" onClick={() => removeRow(idx)} className="text-red-500 px-2">-</button>
              )}
              {idx === colorSizeRows.length - 1 && (
                <button type="button" onClick={addRow} className="text-green-500 px-2">+</button>
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Item</button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
