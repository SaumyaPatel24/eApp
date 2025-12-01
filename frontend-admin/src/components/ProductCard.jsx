import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onRemove, onEditStock, onEditPrice, onRemoveColor, onRemoveSize, onAddColorSize }) {
  const [hoverColorIdx, setHoverColorIdx] = useState(null);
  const [hoverSizeIdx, setHoverSizeIdx] = useState(null);
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceValue, setPriceValue] = useState(product.price);

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center relative">
      {/* Red minus icon for remove product */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
        title="Remove Product"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="white" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
        </svg>
      </button>
      <img src={product.imageUrl} alt={product.name} className="h-32 w-auto object-contain mb-2" />
      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
      <p className="text-gray-600 mb-1">Brand: {product.brand}</p>
      <p className="text-gray-600 mb-1">Category: {product.category}</p>
      <div className="flex items-center mb-1">
        <span className="text-blue-600 font-semibold">${editingPrice ? (
          <input
            type="number"
            value={priceValue}
            onChange={e => setPriceValue(e.target.value)}
            className="border px-2 py-1 rounded w-20 mr-2"
            onBlur={() => {
              setEditingPrice(false);
              if (priceValue !== product.price) onEditPrice(product.id, priceValue);
            }}
            autoFocus
          />
        ) : product.price}
        </span>
        <button
          className="ml-2 text-gray-500 hover:text-gray-700"
          title="Edit Price"
          onClick={() => setEditingPrice(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.232-6.232a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
          </svg>
        </button>
      </div>
      <p className="text-gray-600 mb-1">Stock: {product.stock}</p>
      <p className="text-yellow-500 mb-1">Rating: {product.rating ?? "N/A"}</p>
      <div className="flex gap-2 flex-wrap mb-1">
        {product.colors && product.colors.map((color, idx) => (
          <span
            key={idx}
            className={`px-2 py-1 bg-gray-100 rounded text-xs transition-all duration-150 relative ${hoverColorIdx === idx ? "scale-110 z-10" : ""}`}
            onMouseEnter={() => setHoverColorIdx(idx)}
            onMouseLeave={() => setHoverColorIdx(null)}
          >
            {color}
            {hoverColorIdx === idx && (
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                title="Remove Color"
                onClick={() => onRemoveColor(product.id, color)}
              >
                ×
              </button>
            )}
          </span>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap mb-2">
        {product.sizes && product.sizes.map((size, idx) => (
          <span
            key={idx}
            className={`px-2 py-1 bg-gray-200 rounded text-xs transition-all duration-150 relative ${hoverSizeIdx === idx ? "scale-110 z-10" : ""}`}
            onMouseEnter={() => setHoverSizeIdx(idx)}
            onMouseLeave={() => setHoverSizeIdx(null)}
          >
            {size}
            {hoverSizeIdx === idx && (
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                title="Remove Size"
                onClick={() => onRemoveSize(product.id, size)}
              >
                ×
              </button>
            )}
          </span>
        ))}
      </div>
      <button
        onClick={onEditStock}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
      >
        Edit Stock
      </button>
      <button
        onClick={onAddColorSize}
        className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
      >
        Add Color/Size
      </button>
    </div>
  );
}
