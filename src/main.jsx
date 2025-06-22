// project-1/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from "./context/WishlistContext";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";  // ✅ import this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ wrap everything */}
      <ThemeProvider>
        <CartProvider>
        <WishlistProvider>
        <AuthProvider>
          <App />
          </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

