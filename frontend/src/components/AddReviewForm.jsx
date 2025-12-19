import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../api/client";

export default function AddReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const submitReview = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        userId: user.id,  
        rating,
        comment,            
      }),
    });

    const data = await res.json();

    if (res.ok) {
      onReviewAdded(data);  
      setComment("");
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={submitReview} className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>

      <label className="block mb-1">Rating</label>
      <select
        className="border p-2 mb-3"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value="5">⭐ 5</option>
        <option value="4">⭐ 4</option>
        <option value="3">⭐ 3</option>
        <option value="2">⭐ 2</option>
        <option value="1">⭐ 1</option>
      </select>

      <label className="block mb-1">Review</label>
      <textarea
        className="border p-2 w-full h-24 mb-3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />

      <button type="submit" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-lg hover:bg-orange-400 transition">
        Submit Review
      </button>

    </form>
  );
}
