import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import StarRating from "../components/StarRating";
import AddReviewForm from "../components/AddReviewForm";
import Reviews from "../components/Reviews";

export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Selected options
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // UI state
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const { user: loggedInUser } = useAuth();
  const [reviews, setReviews] = useState([]);

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from, { replace: false });

      setTimeout(() => {
        // Try to locate the card by product ID
        const card = document.querySelector(`[data-product-id="${location.state.productId}"]`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          // fallback scroll if element not found
          window.scrollTo({ top: location.state.scrollY || 0, behavior: "smooth" });
        }
      }, 400); // small delay to allow DOM re-render
    } else {
      navigate("/catalog");
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  // Load product info
  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    loadProduct();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  // For now, use sample colors (later fetch from DB)
  const colors = product.variants
  ? product.variants.map(v => v.color)    
  : product.colors || [];                

  const sizes =
  product.variants && selectedColor
    ? product.variants.find(v => v.color === selectedColor)?.sizes || []
    : product.sizes || [];


  const handleAddToCart = () => {
    setError("");

    if (!selectedColor)
      return setError("Please select a color.");
    if (!selectedSize)
      return setError("Please select a size.");
    if (quantity < 1)
      return setError("Quantity must be at least 1.");

    if (quantity > product.stock) {
      return setError(`Only ${product.stock} in stock!`);
    }

    const item = {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    color: selectedColor,
    size: selectedSize,
    quantity: quantity,
    gender: product.gender
  };

    addToCart(item);

    alert("Added to cart!");
  };



  return (
    <div className="bg-white min-h-screen px-8 py-10">
    <div className="max-w-5xl mx-auto mt-10 flex gap-12">

      {/* LEFT — Product Image */}
      <div className="w-1/2">
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
      >
        ← Back to Catalog
      </button>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-100 w-full object-cover rounded mb-4"
      />
      </div>
      {/* RIGHT — Product Info */}
      <div className="w-1/2">
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-3 mb-4">
        <StarRating rating={product.rating} />
        <span className="text-gray-600">{product.reviewCount} reviews</span>
        </div>
        <p className="text-gray-700 mb-1">{product.brand}</p>
        <p className="text-gray-500 mb-4">{product.gender}</p>
        <p className="text-2xl font-bold mb-6">${product.price}</p>
        
        {/* COLOR SELECTOR */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Color</h3>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border rounded 
                ${
                  selectedColor === color
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* SIZE SELECTOR */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Size</h3>
          <div className="flex gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded 
                ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* QUANTITY SELECTOR */}
        <div className="mb-6">
  <h3 className="font-semibold mb-2">Quantity</h3>

  <div className="flex items-center gap-3">

    {/* MINUS BUTTON */}
    <button
      onClick={() => 
        setQuantity(q => (q > 1 ? q - 1 : 1))
      }
      className="px-3 py-2 bg-gray-200 rounded text-xl hover:bg-gray-300"
    >
      –
    </button>

    {/* QUANTITY DISPLAY */}
    <span className="text-xl font-semibold">{quantity}</span>

    {/* PLUS BUTTON */}
    <button
      onClick={() =>
        setQuantity(q => (q < product.stock ? q + 1 : q))
      }
      className="px-3 py-2 bg-gray-200 rounded text-xl hover:bg-gray-300"
    >
      +
    </button>
    </div>

    <p className="text-sm text-gray-500 mt-1">
      {product.stock} available
    </p>
    </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-3 rounded
                     hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
  {/* REVIEWS SECTION */}
  </div>
      </div>
      <div className="mt-16 border-t pt-6">
    <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

    {!loggedInUser && (
      <p className="text-gray-600 mb-4">
        Please <a href="/signin" className="text-blue-600 underline">sign in</a> to write a review.
      </p>
    )}

    {loggedInUser && (
      <AddReviewForm 
        productId={product.id}
        onReviewAdded={() => {}}
      />
    )}
    <Reviews productId={product.id} />
  </div>
   </div> 

    
  );
}
