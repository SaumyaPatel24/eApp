export default function StarRating({ rating }) {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push("★");     // FULL STAR
    } else if (rating >= i - 0.5) {
      stars.push("⯨");     // HALF STAR (better looking)
    } else {
      stars.push("☆");     // EMPTY STAR
    }
  }

  return (
    <span className="text-yellow-400 text-xl tracking-wider">
      {stars.join("")}
    </span>
  );
}
