import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  password: "",
  address: "",
});


  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSignup = async () => {
  try {
    const { name, email, password, phone } = form;
    console.log("Sending signup form:", form);


    const res = await axios.post("https://shoe-shine-app.onrender.com/api/signup", {
      name,
      email,
      password,
      phone,
      address: "N/A", // or collect from form later
    });

    alert("Signup successful! Please login.");
    navigate("/login");
  } catch (err) {
    alert(err.response?.data?.error || "Signup failed. Try again.");
  }
};


  return (
    <div style={{ padding: "30px", maxWidth: "400px", margin: "auto" }}>
      <h2>📝 Sign Up</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <br />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} />
      <br />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <br />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <br />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <br />
      <button onClick={handleSignup}>Create Account</button>
    </div>
  );
};

export default SignupPage;
