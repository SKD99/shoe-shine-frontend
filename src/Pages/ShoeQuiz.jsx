import React, { useState } from "react";
import axios from "axios";

const ShoeQuiz = () => {
  const questions = [
    "How often do you attend parties?",
    "Do you prefer comfort over style?",
    "Would you wear bright colors?",
    "Do you like outdoor activities?",
    "Are you into fashion trends?"
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (idx, value) => {
    const newAnswers = [...answers];
    newAnswers[idx] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://shoe-shine-app.onrender.com/api/personality-quiz", { answers });
      setResult(res.data.result);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>👟 Shoe Personality Quiz</h2>
      {questions.map((q, i) => (
        <div key={i}>
          <p>{q}</p>
          <select onChange={(e) => handleChange(i, e.target.value)}>
            <option value="0">Never</option>
            <option value="1">Sometimes</option>
            <option value="2">Often</option>
          </select>
        </div>
      ))}
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Quiz"}
      </button>
      {result && <h3 style={{ marginTop: 20 }}>🔍 Result: {result}</h3>}
    </div>
  );
};

export default ShoeQuiz;
