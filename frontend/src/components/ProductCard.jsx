import {Link, useLocation} from 'react-router-dom'

export default function ProductCard({ product }) {
  const location = useLocation();
  return (
    <div data-product-id={product.id} className="border rounded p-4 bg-white relative group overflow-hidden">
      <Link to={`/product/${product.id}`}
      state={{
          from: location.pathname,
          productId: product.id,      // 👈 add this
          scrollY: window.scrollY,    // optional fallback
        }}>
      <img 
        src={product.imageUrl}
        alt={product.name}
        className="h-48 w-full object-cover rounded mb-4"
      />
      <h2 className="font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.brand}</p>
      <p className="text-sm text-gray-500 mb-1">{product.gender}</p>
      <p className="mt-2 font-bold">${product.price}</p>
      </Link>
    </div>
  );
}
