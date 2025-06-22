import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <h2>Please login to access your profile</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h2>👤 Profile</h2>
      {user.photo && (
        <img
          src={`https://shoe-shine-app.onrender.com/static/${user.photo}`}
          alt="Profile"
          style={{ width: "120px", borderRadius: "50%" }}
        />
      )}
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>

      <button onClick={() => {
        logout();
        navigate("/login");
      }}>Logout</button>
    </div>
  );
};

export default ProfilePage;
