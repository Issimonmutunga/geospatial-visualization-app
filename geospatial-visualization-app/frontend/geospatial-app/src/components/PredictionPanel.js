//This component sends input data to the backend ML model and displays predictions.

import React, { useState } from "react";
import axios from "../api";

const PredictionPanel = () => {
  const [inputData, setInputData] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post("/api/predict", { data: inputData });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Error in prediction!");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter data for prediction"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button onClick={handlePredict}>Run Prediction</button>
      {prediction && <p>Prediction Result: {prediction}</p>}
    </div>
  );
};

export default PredictionPanel;
