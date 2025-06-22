import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./Pages/Home";
import CategoryPage from "./Pages/CategoryPage";
import CheckoutPage from "./Pages/CheckoutPage";
import CartPage from "./Pages/CartPage";
import ShoeAdvisor from "./Pages/ShoeAdvisor";
import ShoeQuiz from "./Pages/ShoeQuiz";
import StyleMatch from "./Pages/StyleMatch";
import InvoicePage from "./Pages/InvoicePage";
import PaymentPage from "./Pages/PaymentPage";
import OrderHistory from "./Pages/OrderHistory";
import WishlistPage from "./Pages/WishlistPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Auth Protection
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { user } = useAuth();

  return (
    <div className="app">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<CategoryPage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <ProfilePage />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        {/* Public but utility pages */}
        <Route path="/advisor" element={<ShoeAdvisor />} />
        <Route path="/quiz" element={<ShoeQuiz />} />
        <Route path="/match" element={<StyleMatch />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
