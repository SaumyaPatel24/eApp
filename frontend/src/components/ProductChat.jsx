import { useState } from "react";
import { BASE_URL } from "../api/client";

export default function ProductChat() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function askBot() {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token"); 
      const res = await fetch(`${BASE_URL}/api/chatbot/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResults(data.products || []);
    } catch (err) {
      console.error("Chatbot error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded w-full text-white"
      />

      <button
        onClick={askBot}
        className="bg-orange-500 text-black py-2 rounded font-semibold"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <div className="mt-2 flex flex-col gap-2 max-h-80 overflow-y-auto">
        {results.map((p) => (
          <div key={p.id} className="flex gap-2 bg-zinc-800 p-2 rounded">
            <img
              src={p.imageUrl}
              alt={p.name}
              className="h-16 w-16 object-cover rounded"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-sm font-semibold text-zinc-50">{p.name}</h3>
              <p className="text-sm text-zinc-300">${p.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
        {results.length === 0 && !loading && (
          <p className="text-sm text-zinc-400">No products found.</p>
        )}
      </div>
    </div>
  );
}
