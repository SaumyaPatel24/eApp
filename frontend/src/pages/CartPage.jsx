import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Tax
  const taxRate = 0.13;
  const taxAmount = subtotal * taxRate;

  // Final total
  const total = subtotal + taxAmount;

  const handleCheckout = () => {
    if (!user) {
      // Not logged in: redirect to sign in with return URL
      return navigate("/signin", {
        state: { from: "/checkout" }
      });
    }

    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black px-4 py-10 text-center text-zinc-50">
        <h2 className="mb-3 text-2xl font-semibold">Your cart is empty</h2>
        <Link
          to="/"
          className="text-sm font-medium text-orange-500 hover:text-orange-400"
        >
          Go back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-zinc-50">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight">Your Cart</h1>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        {/* Left: items */}
        <div className="flex-1">

          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-2xl bg-zinc-900/80 px-4 py-3 shadow-sm ring-1 ring-zinc-800"
              >
                {/* PRODUCT IMAGE TILE */}
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-950">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h2 className="truncate text-sm font-semibold text-zinc-50">{item.name}</h2>
                  <p className="text-xs text-zinc-400">
                    Color: <span className="font-medium">{item.color}</span>
                  </p>
                  <p className="text-xs text-zinc-400">
                    Size: <span className="font-medium">{item.size}</span>
                  </p>
                  <p className="text-xs text-zinc-400">
                    Gender: <span className="font-medium">{item.gender}</span>
                  </p>
                </div>

                {/* QUANTITY + PRICE + REMOVE */}
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item, Math.max(1, item.quantity - 1))
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-xs hover:bg-zinc-700"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item, item.quantity + 1)
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-xs hover:bg-zinc-700"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-zinc-50">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CLEAR CART */}
          <p>
            <button
              onClick={clearCart}
              className="mt-6 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-100 ring-1 ring-zinc-700 hover:bg-zinc-800"
            >
              Clear Cart
            </button>
          </p>
        </div>

        {/* Right: order summary */}
        <div className="w-full max-w-xs self-start rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 lg:sticky lg:top-24">
        <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>

        <div className="space-y-2 text-sm text-zinc-300">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (13%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>

          <hr className="my-3 border-zinc-800" />

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="mt-6 w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-black hover:bg-orange-400"
        >
          Proceed to Checkout
        </button>
      </div> 
    </div>
      </div>
    </div>
  );
}
