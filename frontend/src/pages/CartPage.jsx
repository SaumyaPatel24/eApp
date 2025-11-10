import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Tax (13% for example)
  const taxRate = 0.13;
  const taxAmount = subtotal * taxRate;

  // ✅ Final total
  const total = subtotal + taxAmount;

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
        <Link
          to="/"
          className="text-blue-600 underline hover:text-blue-800 text-lg"
        >
          Go back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 border p-4 rounded shadow"
          >
            {/* PRODUCT IMAGE */}
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-28 h-28 object-cover rounded"
            />

            <div className="flex-1">
              {/* NAME */}
              <h2 className="text-xl font-semibold">{item.name}</h2>

              {/* COLOR + SIZE */}
              <p className="text-gray-600">
                Color: <span className="font-medium">{item.color}</span>
              </p>
              <p className="text-gray-600">
                Size: <span className="font-medium">{item.size}</span>
              </p>

              <div className="flex items-center gap-3">
            <button
              onClick={() =>
                updateQuantity(item, Math.max(1, item.quantity - 1))
              }
              className="px-3 py-1 bg-gray-200 rounded text-lg"
            >
              -
            </button>

            <span className="text-lg font-semibold">{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item, item.quantity + 1)
              }
              className="px-3 py-1 bg-gray-200 rounded text-lg"
            >
              +
            </button>
          </div>


              {/* PRICE */}
              <p className="text-lg font-bold mt-2">
                ${item.price * item.quantity}
              </p>
            </div>

            {/* REMOVE BUTTON */}
            <button
              onClick={() => removeFromCart(item)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* CLEAR CART */}
      <p><button
        onClick={clearCart}
        className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
      >
        Clear Cart
      </button></p><br></br>
           <div className="border p-6 rounded-lg shadow-lg h-fit sticky top-6">
        <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>

        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (13%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* ✅ Checkout Button */}
        <button
          className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition text-lg font-semibold"
        >
          Proceed to Checkout
        </button>
      </div> 
    </div>
    
  );
}
