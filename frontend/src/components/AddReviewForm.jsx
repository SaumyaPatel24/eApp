import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AddReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const submitReview = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        userId: user.id,    // ✅ correct user ID
        rating,
        comment,            // ✅ backend expects "comment"
      }),
    });

    const data = await res.json();

    if (res.ok) {
      onReviewAdded(data);  // ✅ send new review upward
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

      <button className="bg-black text-white px-4 py-2 rounded">
        Submit Review
      </button>
    </form>
  );
}
