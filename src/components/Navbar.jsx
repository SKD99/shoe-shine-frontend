import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link
  to="/"
  className="logo"
  style={{
    color: theme === "dark" ? "#f5f5f5" : "#2c3e50",
  }}
>
  👟 Shoe Shine
</Link>



      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/advisor">AI Advisor 🤖</Link></li>
        <li><Link to="/quiz">Personality Quiz</Link></li>
        <li><Link to="/match">Style Match</Link></li>
        <li><Link to="/cart">🛒 Cart ({cart.length})</Link></li>
        <li>
          <Link to="/wishlist">
            ❤️ Wishlist
            {wishlist.length > 0 && (
              <span className="wishlist-count-badge">{wishlist.length}</span>
            )}
          </Link>
        </li>
        <li>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </li>

        {/* Profile / Login Dropdown */}
        <li className="profile-dropdown" onMouseLeave={closeDropdown}>
          <button onClick={toggleDropdown} className="profile-btn">
            👤 {user ? user.name : "Account"}
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              {user ? (
                <>
                  <Link to="/profile" onClick={closeDropdown}>My Profile</Link>
                  <button onClick={() => { logout(); closeDropdown(); }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeDropdown}>Login</Link>
                  <Link to="/signup" onClick={closeDropdown}>Signup</Link>
                </>
              )}
            </div>
          )}
        </li>
      </ul>

      {/* Optional: Close dropdown when clicking outside (if you want) */}
    </nav>
  );
};

export default Navbar;
