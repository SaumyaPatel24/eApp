import { useEffect, useState } from "react";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function loadReviews() {
      const res = await fetch(`http://localhost:5000/api/reviews/${productId}`);
      const data = await res.json();
      setReviews(data);
    }
    loadReviews();
  }, [productId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet. Be the first!</p>
      )}

      {reviews.map(r => (
        <div key={r.id} className="border-b py-3">
          <p className="font-semibold">{`⭐`.repeat(r.rating)}</p>
          <p className="mt-1">{r.comment}</p>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(r.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            {r.User?.firstName || "Anonymous"}
          </p>
        </div>
      ))}
    </div>
  );
}
