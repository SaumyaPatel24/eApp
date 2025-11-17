import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart } = useCart();
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

  const handlePlaceOrder = () => {
    if (!isFormComplete) return;

    alert("Order placed successfully!");
    navigate("/");
  };

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.13; // 13% HST
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-xl w-full min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT — Delivery Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

            {/* USER INFO (auto-filled) */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>

            {/* ADDRESS FORM */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Address Line 1"
                className="w-full border rounded px-3 py-2"
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
          <div className="bg-white rounded-lg shadow p-6">

            {/* PAYMENT METHODS */}
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

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
                  <span className="text-gray-700">{method}</span>
                </label>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="text-gray-700 space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (13%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={!isFormComplete}
              className={`w-full py-3 mt-4 rounded text-white font-bold 
                ${isFormComplete ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}
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
