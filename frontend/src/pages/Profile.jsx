import { useEffect, useState } from "react";
import { BASE_URL } from "../api/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState(""); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    if (!token) return;

    async function loadProfile() {
      try {
        const res = await fetch(`${BASE_URL}/api/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data);
        setAddress(data.address || ""); 
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();
  }, [token]);

  async function saveAddress() {
    try {
      const res = await fetch(`${BASE_URL}/api/user/address`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address }),
      });

      if (!res.ok) throw new Error("Failed to update address");

      const data = await res.json();

      updateUser({ ...user, address: data.address });
      setProfile(prev => ({ ...prev, address: data.address }));

      alert("Address saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    }
  }

  if (!profile) return <div className="text-center mt-10 text-white">Loading...</div>;

  const orders = Array.isArray(profile.Orders) ? profile.Orders : [];

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-zinc-50">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-orange-500">
          Hello, {profile.firstName}
        </h1>

        <section className="mt-6 rounded-2xl bg-zinc-900/80 p-4 shadow-sm ring-1 ring-zinc-800">
          <h2 className="text-xl font-semibold mb-2">Customer Info</h2>
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone || "Not set"}</p>

          <div className="mt-4">
            <label className="block mb-1 font-medium">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your address"
            />
            <button
              onClick={saveAddress}
              className="mt-2 rounded-lg bg-orange-500 px-4 py-1 text-black font-semibold hover:bg-orange-400"
            >
              Save Address
            </button>
          </div>
        </section>

        <p className="mt-6 font-semibold text-xl text-orange-500">Past Orders</p>
        {orders.length === 0 ? (
          <p className="mt-6 text-lg">You have no past orders.</p>
        ) : (
          <div className="mt-6 flex flex-col gap-8">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="rounded-2xl bg-zinc-900/80 p-4 shadow-sm ring-1 ring-zinc-800"
              >
                <h2 className="mb-3 text-xl font-semibold">
                  Order #{index+1} - {order.status}
                </h2>
                <p className="text-sm text-zinc-400 mb-3">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <div className="space-y-4">
                  {Array.isArray(order.OrderItems) && order.OrderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-xl bg-zinc-950 p-3"
                    >
                      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-900">
                        <img
                          src={item.Product.imageUrl}
                          alt={item.Product.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <h3 className="text-sm font-semibold text-zinc-50">
                          {item.Product.name}
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Quantity: <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p className="text-xs text-zinc-400">
                          Price: <span className="font-medium">${item.price.toFixed(2)}</span>
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-zinc-50">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-right text-lg font-semibold">
                  Order Total: ${order.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
