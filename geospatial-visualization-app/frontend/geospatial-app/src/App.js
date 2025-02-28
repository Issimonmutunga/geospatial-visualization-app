git checkout main
import './App.css';

import React from "react";
import MapViewer from "./components/MapViewer";
import FileUploader from "./components/FileUploader";
import PredictionPanel from "./components/PredictionPanel";

function App() {
  return (
    <div>
      <h1>Geospatial Data Visualization & Prediction</h1>
      <FileUploader />
      <MapViewer />
      <PredictionPanel />
    </div>
  );
}

export default App

