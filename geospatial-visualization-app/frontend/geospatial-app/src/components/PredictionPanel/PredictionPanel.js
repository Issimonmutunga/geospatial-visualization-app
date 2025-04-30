// Import necessary libraries and components
import React, { useState } from "react"; // React and useState hook for managing state
import axios from "../../api"; // Axios instance for making HTTP requests
import { Input } from "../ui/input"; // Custom Input component
import { Button } from "../ui/button"; // Custom Button component
import { toast } from "sonner"; // Toast notifications for user feedback
import { Card } from "../ui/card"; // Custom Card component for layout
import "./PredictionPanel.css"; // Custom CSS for PredictionPanel component

const PredictionPanel = () => {
  const [inputData, setInputData] = useState(""); // State to hold the user input data for prediction
  const [prediction, setPrediction] = useState(null); // State to store the prediction result

  // Function to handle the prediction request
  const handlePredict = async () => {
    try {
      // Make a POST request with the input data to fetch the prediction
      const response = await axios.post("/api/predict", { data: inputData });
      setPrediction(response.data.prediction); // Set the prediction result in state
      toast.success("Prediction complete"); // Show success toast notification
    } catch (err) {
      console.error("Prediction failed:", err); // Log any errors during prediction
      toast.error("Failed to fetch prediction"); // Show error toast notification
    }
  };

  return (
    <Card className="prediction-card"> {/* Card container for the PredictionPanel */}
      <h3 className="prediction-title">Prediction Panel</h3> {/* Title of the panel */}
      <Input
        value={inputData} // Bind the input value to state
        onChange={(e) => setInputData(e.target.value)} // Update state on input change
        placeholder="Enter data for prediction" // Placeholder text for the input field
        className="prediction-input" // Custom styling for the input
      />
      <Button onClick={handlePredict} className="prediction-button"> {/* Button to trigger prediction */}
        Run Prediction
      </Button>
      {prediction && (
        <p className="prediction-result"> {/* Display the prediction result if available */}
          <strong>Prediction Result:</strong> {prediction}
        </p>
      )}
    </Card>
  );
};

export default PredictionPanel; // Export PredictionPanel component for use elsewhere
