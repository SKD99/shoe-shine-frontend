import React, { useState } from "react";
import axios from "axios";

const StyleMatch = () => {
  const [outfitType, setOutfitType] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://shoe-shine-app.onrender.com/api/style-match", {
        outfit_type: outfitType
      });
      setResult(res.data.suggestion);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>🧥 Outfit & Shoe Match</h2>
      <select value={outfitType} onChange={(e) => setOutfitType(e.target.value)}>
        <option value="">-- Select Outfit Type --</option>
        <option>Casual</option>
        <option>Formal</option>
        <option>Sporty</option>
        <option>Ethnic</option>
      </select>
      <br /><br />
      <button onClick={handleSubmit}>Get Match Suggestion</button>
      {result && <p style={{ marginTop: 20 }}>🔍 Match: {result}</p>}
    </div>
  );
};

export default StyleMatch;
