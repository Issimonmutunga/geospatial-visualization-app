import './App.css';

import React from "react";
import MapViewer from "./components/MapViewer";
import FileUploader from "./components/FileUploader";
import PredictionPanel from "./components/PredictionPanel";

function App() {
  return (
    <div>
      <h2>Map</h2>
      <FileUploader />
      <MapViewer />
      <PredictionPanel />
    </div>
  );
}

export default App

