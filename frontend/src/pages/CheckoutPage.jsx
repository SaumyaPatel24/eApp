import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/client";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/signin", { state: { from: "/checkout" } });
  }, [user]);

  const [saveAddress, setSaveAddress] = useState(false);
  const [address, setAddress] = useState({ line1: "", city: "", state: "", postalCode: "" });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardInfo, setCardInfo] = useState({ number: "", cvv: "", expiry: "" });

  useEffect(() => {
    const parts = (user?.address || "").split(",").map(p => p.trim());
    setAddress({
      line1: parts[0] || "",
      city: parts[1] || "",
      state: parts[2] || "",
      postalCode: parts[3] || "",
    });
  }, [user?.address]);

  const isFormComplete =
    address.line1 &&
    address.city &&
    address.state &&
    address.postalCode &&
    paymentMethod &&
    (paymentMethod !== "Credit Card/Debit Card" || (cardInfo.number && cardInfo.cvv && cardInfo.expiry));

  const handlePlaceOrder = async () => {
    if (!isFormComplete) return;

    try {
      const items = cart.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price }));

      await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          total: Number(total.toFixed(2)),
          status: "paid",
          items,
          address: `${address.line1}, ${address.city}, ${address.state}, ${address.postalCode}`,
        }),
      });

      if (saveAddress && (!user.address || user.address === "")) {
        await fetch(`${BASE_URL}/api/user/address`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            address: `${address.line1}, ${address.city}, ${address.state}, ${address.postalCode}`,
          }),
        });
      }

      clearCart();
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-zinc-50">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-3xl font-semibold tracking-tight">Checkout</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
            <h2 className="mb-4 text-lg font-semibold">Delivery Information</h2>
            <div className="mb-6">
              <p className="font-medium text-zinc-50">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-zinc-400">{user.email}</p>
              <p className="text-sm text-zinc-400">{user.phone}</p>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Address Line 1" className="w-full rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100" value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} required />
              <input type="text" placeholder="City" className="w-full border rounded px-3 py-2" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required />
              <input type="text" placeholder="State" className="w-full border rounded px-3 py-2" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} required />
              <input type="text" placeholder="Postal Code" className="w-full border rounded px-3 py-2" value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} required />
              {(!user.address || user.address === "") && (
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={saveAddress} onChange={e => setSaveAddress(e.target.checked)} />
                  <span className="text-sm text-zinc-200">Save this address for future orders</span>
                </label>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6">
            <h2 className="mb-4 text-lg font-semibold">Payment Method</h2>
            <div className="space-y-3 mb-6">
              {["Credit Card/Debit Card", "Cash on Delivery"].map(method => (
                <label key={method} className="flex flex-col gap-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={e => setPaymentMethod(e.target.value)} />
                    <span className="text-sm text-zinc-200">{method}</span>
                  </div>
                  {method === "Credit Card/Debit Card" && paymentMethod === "Credit Card/Debit Card" && (
                    <div className="ml-6 mt-2 flex flex-col gap-2">
                      <input type="text" placeholder="Card Number" className="w-1/2 border rounded px-3 py-2 text-sm" value={cardInfo.number} onChange={e => setCardInfo({ ...cardInfo, number: e.target.value })} required />
                      <input type="text" placeholder="CVV" className="w-1/2 border rounded px-3 py-2 text-sm" value={cardInfo.cvv} onChange={e => setCardInfo({ ...cardInfo, cvv: e.target.value })} required />
                      <input type="text" placeholder="Expiry (MM/YY)" className="w-1/2 border rounded px-3 py-2 text-sm" value={cardInfo.expiry} onChange={e => setCardInfo({ ...cardInfo, expiry: e.target.value })} required />
                    </div>
                  )}
                </label>
              ))}
            </div>

            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            <div className="mb-4 space-y-2 text-sm text-zinc-300">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax (13%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <button onClick={handlePlaceOrder} disabled={!isFormComplete} className={`mt-4 w-full rounded-full py-3 text-sm font-semibold text-black ${isFormComplete ? "bg-orange-500 hover:bg-orange-400" : "bg-zinc-600 cursor-not-allowed text-zinc-300"}`}>
              Place Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
