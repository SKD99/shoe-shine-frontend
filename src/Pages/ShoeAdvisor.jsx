import React, { useState } from "react";
import axios from "axios";

const ShoeAdvisor = () => {
  const [occasion, setOccasion] = useState("");
  const [language, setLanguage] = useState("English");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);
  const [userImagePreview, setUserImagePreview] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setUserImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!occasion || !color || !size) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("occasion", occasion);
    formData.append("language", language);
    formData.append("color", color);
    formData.append("size", size);
    if (image) formData.append("photo", image);

    try {
      setLoading(true);
      const res = await axios.post("https://shoe-shine-app.onrender.com/api/advice", formData);
      setSuggestion(res.data.message);
    } catch (err) {
      console.error("❌ Error:", err);
      setSuggestion("Server error: Unable to get suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>🧠 AI Shoe Customization</h2>
      <p>Choose your preferences and get a suggestion!</p>

      <select value={occasion} onChange={(e) => setOccasion(e.target.value)} style={selectStyle}>
        <option value="">-- Select Occasion --</option>
        <option>Wedding</option>
        <option>Office</option>
        <option>Party</option>
        <option>Gym</option>
      </select>

      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ ...selectStyle, width: "100px" }} />

      <select value={size} onChange={(e) => setSize(e.target.value)} style={selectStyle}>
        <option value="">-- Select Size --</option>
        {[6, 7, 8, 9, 10, 11].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <select value={language} onChange={(e) => setLanguage(e.target.value)} style={selectStyle}>
        <option>English</option>
        <option>Hindi</option>
      </select>

      <br /><br />
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <br /><br />
      <button onClick={handleSubmit} style={buttonStyle} disabled={loading}>
        {loading ? "Generating..." : "Get Custom Suggestion"}
      </button>

      {suggestion && (
        <p style={{ marginTop: "20px", fontSize: "18px", fontWeight: "600" }}>
          🔎 Suggestion: {suggestion}
        </p>
      )}

      {userImagePreview && (
        <div style={{ marginTop: "20px" }}>
          <h4>🧍 Your Uploaded Outfit</h4>
          <img src={userImagePreview} alt="User Preview" style={{ maxWidth: "250px", borderRadius: "12px" }} />
        </div>
      )}

      {loading && (
        <p style={{ marginTop: "20px", fontWeight: "500" }}>⏳ Please wait while we process your request...</p>
      )}
    </div>
  );
};

const selectStyle = {
  padding: "10px",
  margin: "10px",
  borderRadius: "8px",
  fontSize: "16px",
  minWidth: "180px"
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#ff6b6b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default ShoeAdvisor;
