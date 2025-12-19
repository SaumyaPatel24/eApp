import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ChatWidget from "./components/ChatWidget";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <CartProvider>
    <AuthProvider>
      <App />
      <ChatWidget />
    </AuthProvider>
  </CartProvider>
</BrowserRouter>

);
