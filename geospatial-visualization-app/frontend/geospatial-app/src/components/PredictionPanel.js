import React, { useState } from "react";
import axios from "../api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const PredictionPanel = () => {
  const [inputData, setInputData] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post("/api/predict", { data: inputData });
      setPrediction(response.data.prediction);
      toast.success("Prediction complete");
    } catch (err) {
      console.error("Prediction failed:", err);
      toast.error("Failed to fetch prediction");
    }
  };

  return (
    <div className="p-4 h-screen overflow-y-auto bg-gray-50 border-r w-full max-w-md">
      <h3 className="text-lg font-bold mb-4">Prediction Panel</h3>
      <Input
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter data for prediction"
        className="mb-4"
      />
      <Button onClick={handlePredict}>Run Prediction</Button>
      {prediction && (
        <p className="mt-4 text-sm">
          <strong>Prediction Result:</strong> {prediction}
        </p>
      )}
    </div>
  );
};

export default PredictionPanel;
