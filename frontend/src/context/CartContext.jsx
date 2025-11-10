import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Load correct cart when context initializes
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Load user cart
    const stored = JSON.parse(localStorage.getItem(`cart_user_${user.id}`)) || [];
    setCart(stored);
  } else {
    // Load guest cart
    const stored = JSON.parse(localStorage.getItem("cart_guest")) || [];
    setCart(stored);
  }
}, []);


  // ✅ Helper: Save cart to localStorage
  const saveCart = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const updateQuantity = (item, newQty) => {
  setCart(curr =>
    curr.map(i =>
      i.id === item.id && i.size === item.size && i.color === item.color
        ? { ...i, quantity: newQty }
        : i
    )
  );
};

  // ✅ Switch cart depending on login / logout
  const reloadCartForUser = (user) => {
    if (user) {
      // ✅ logged-in cart
      const key = `cart_user_${user.id}`;
      const stored = JSON.parse(localStorage.getItem(key)) || [];
      setCart(stored);
    } else {
      // ✅ guest cart
      const stored = JSON.parse(localStorage.getItem("cart_guest")) || [];
      setCart(stored);
    }
  };

  // ✅ Save cart on every change
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const key = `cart_user_${user.id}`;
      saveCart(key, cart);
    } else {
      saveCart("cart_guest", cart);
    }
  }, [cart]);

  // ✅ Add item
  const addToCart = (item) => {
    setCart((curr) => {
      const existing = curr.find(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );

      if (existing) {
        return curr.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...curr, item];
    });
  };

  // ✅ Remove item
  const removeFromCart = (item) => {
    setCart((curr) => curr.filter((i) => i !== item));
  };

  // ✅ Clear
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, reloadCartForUser, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}
