import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/client";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // Redirect if no user
  if (!user) {
    navigate("/signin", { state: { from: "/checkout" } });
    return null;
  }

  // Delivery info state
  const [address, setAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("");

  // Validation
  const isFormComplete =
    address.line1 &&
    address.city &&
    address.state &&
    address.postalCode &&
    paymentMethod;

  const handlePlaceOrder = async () => {
    if (!isFormComplete) return;

    try {
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          total: Number(total.toFixed(2)),
          status: "paid",
          items,
        }),
      });

      clearCart();
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.13; // 13% HST
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-zinc-50">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-center text-3xl font-semibold tracking-tight">Checkout</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* LEFT — Delivery Info */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
            <h2 className="mb-4 text-lg font-semibold">Delivery Information</h2>

            {/* USER INFO (auto-filled) */}
            <div className="mb-6">
              <p className="font-medium text-zinc-50">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-zinc-400">{user.email}</p>
              <p className="text-sm text-zinc-400">{user.phone}</p>
            </div>

            {/* ADDRESS FORM */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Address Line 1"
                className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                value={address.line1}
                onChange={(e) =>
                  setAddress({ ...address, line1: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="City"
                className="w-full border rounded px-3 py-2"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="State"
                className="w-full border rounded px-3 py-2"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Postal Code"
                className="w-full border rounded px-3 py-2"
                value={address.postalCode}
                onChange={(e) =>
                  setAddress({ ...address, postalCode: e.target.value })
                }
              />
            </div>
          </div>

          {/* RIGHT — Payment + Summary */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">

            {/* PAYMENT METHODS */}
            <h2 className="mb-4 text-lg font-semibold">Payment Method</h2>

            <div className="space-y-3 mb-6">
              {["Credit Card", "UPI Payment", "Cash on Delivery"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="text-sm text-zinc-200">{method}</span>
                </label>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

            <div className="mb-4 space-y-2 text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (13%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!isFormComplete}
              className={`mt-4 w-full rounded-full py-3 text-sm font-semibold text-black 
                ${isFormComplete ? "bg-orange-500 hover:bg-orange-400" : "bg-zinc-600 cursor-not-allowed text-zinc-300"}
              `}
            >
              Place Order
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
