import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CatalogPage from "./pages/CatalogPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";
export default function App() {
  return (
    <div className="min-h-screen bg-black">
    <Navbar />
    <main className="bg-black py-3 px-6 relative flex items-center justify-center relative">
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </main>
    </div>
  )
}




