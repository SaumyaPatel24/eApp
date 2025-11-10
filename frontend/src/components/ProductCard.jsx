import {Link} from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
    <div className="border rounded p-4 bg-white relative group overflow-hidden">
      <img 
        src={product.imageUrl}
        alt={product.name}
        className="h-48 w-full object-cover rounded mb-4"
      />
      <h2 className="font-semibold">{product.name}</h2>
      <p>${product.price}</p>
    </div>
    </Link>
  );
}
