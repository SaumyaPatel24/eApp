import {Link, useLocation} from 'react-router-dom'

export default function ProductCard({ product }) {
  const location = useLocation();
  return (
    <div
      data-product-id={product.id}
      className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition hover:-translate-y-1 hover:border-orange-500 hover:bg-zinc-900/90"
    >
      <Link to={`/product/${product.id}`}
      state={{
          from: location.pathname,
          productId: product.id,     
          scrollY: window.scrollY,   
        }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-4 h-48 w-full rounded-xl object-cover"
      />
      <h2 className="truncate text-sm font-semibold text-zinc-50">{product.name}</h2>
      <p className="text-xs text-zinc-400">{product.brand}</p>
      <p className="mb-1 text-xs text-zinc-500">{product.gender}</p>
      <p className="mt-2 text-sm font-bold text-zinc-50">${product.price}</p>
      </Link>
    </div>
  );
}
