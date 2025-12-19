export default function StarRating({ rating }) {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push("★");
    } else if (rating >= i - 0.5) {
      stars.push("⯨");
    } else {
      stars.push("☆");
    }
  }

  return (
    <span className="text-yellow-400 text-xl tracking-wider">
      {stars.join("")}
    </span>
  );
}
