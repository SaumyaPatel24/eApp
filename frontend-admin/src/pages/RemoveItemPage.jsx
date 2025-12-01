import { useState } from "react";

export default function RemoveItemPage() {
  const [itemId, setItemId] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setItemId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`http://localhost:8001/items/${itemId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove item");
      setMessage("Item removed successfully!");
      setItemId("");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Remove Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Item ID</label>
          <input
            type="text"
            value={itemId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Remove Item</button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
