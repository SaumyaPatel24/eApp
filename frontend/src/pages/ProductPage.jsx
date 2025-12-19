import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import StarRating from "../components/StarRating";
import AddReviewForm from "../components/AddReviewForm";
import Reviews from "../components/Reviews";
import { BASE_URL } from "../api/client";


export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);


  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const { user: loggedInUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from, { replace: false });

      setTimeout(() => {
        const card = document.querySelector(`[data-product-id="${location.state.productId}"]`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
         
          window.scrollTo({ top: location.state.scrollY || 0, behavior: "smooth" });
        }
      }, 400);
    } else {
      navigate("/catalog");
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`${BASE_URL}/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    loadProduct();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

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
    setShowPopup(true);
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 1500);
    setTimeout(() => setShowPopup(false), 2000);
  };



  return (
    <div className="min-h-screen bg-black px-4 py-10 text-zinc-50">
    <div className="mx-auto mt-10 flex max-w-5xl gap-10">

      {/* LEFT — Product Image */}
      <div className="w-full lg:w-1/2">
      <button
        onClick={handleBack}
        className="mb-4 rounded-full bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-200 ring-1 ring-zinc-700 hover:bg-zinc-800"
      >
        ← Back to Catalog
      </button>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-4 h-96 w-full rounded-2xl object-cover"
      />
      </div>
      {/* RIGHT — Product Info */}
      <div className="w-full lg:w-1/2">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">{product.name}</h1>
        <div className="flex items-center gap-3 mb-4">
        <StarRating rating={product.rating} />
        <span className="text-sm text-zinc-400">{product.reviewCount} reviews</span>
        </div>
        <p className="mb-1 text-sm text-zinc-300">{product.brand}</p>
        <p className="mb-4 text-sm text-zinc-500">{product.gender}</p>
        <p className="mb-6 text-2xl font-semibold">${product.price}</p>
        
        {/* COLOR SELECTOR */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-zinc-100">Color</h3>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`rounded-full border px-4 py-2 text-sm 
                ${
                  selectedColor === color
                    ? "border-orange-500 bg-orange-500 text-black"
                    : "border-zinc-700 bg-zinc-900 text-zinc-100"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* SIZE SELECTOR */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-zinc-100">Size</h3>
          <div className="flex gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded-full border px-4 py-2 text-sm 
                ${
                  selectedSize === size
                    ? "border-orange-500 bg-orange-500 text-black"
                    : "border-zinc-700 bg-zinc-900 text-zinc-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* QUANTITY SELECTOR */}
        <div className="mb-6">
  <h3 className="mb-2 text-sm font-semibold text-zinc-100">Quantity</h3>

  <div className="flex items-center gap-3">

    {/* MINUS BUTTON */}
    <button
      onClick={() => 
        setQuantity(q => (q > 1 ? q - 1 : 1))
      }
      className="rounded-full bg-zinc-900 px-3 py-2 text-lg hover:bg-zinc-800"
    >
      –
    </button>

    {/* QUANTITY DISPLAY */}
    <span className="text-lg font-semibold">{quantity}</span>

    {/* PLUS BUTTON */}
    <button
      onClick={() =>
        setQuantity(q => (q < product.stock ? q + 1 : q))
      }
      className="rounded-full bg-zinc-900 px-3 py-2 text-lg hover:bg-zinc-800"
    >
      +
    </button>
    </div>

    <p className="mt-1 text-xs text-zinc-500">
      {product.stock} available
    </p>
    </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* ADD TO CART */}
        <button
          onClick={handleAddToCart}
          className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-black hover:bg-orange-400"
        >
          Add to Cart
        </button>

        {showPopup && (
          <div
            className={`fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black shadow-lg transition-opacity duration-500 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            Added to cart!
          </div>
        )}



  {/* REVIEWS SECTION */}
  </div>
      </div>
      <div className="mt-16 border-t border-zinc-800 pt-6">
    <h2 className="mb-4 text-2xl font-semibold">Customer Reviews</h2>

    {!loggedInUser && (
      <p className="mb-4 text-sm text-zinc-400">
        Please <a href="/signin" className="text-orange-400 underline">sign in</a> to write a review.
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
