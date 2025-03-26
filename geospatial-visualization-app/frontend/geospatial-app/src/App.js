import './App.css';



import React from "react";
import MapViewer from "./components/MapViewer";
import FileUploader from "./components/FileUploader";
import PredictionPanel from "./components/PredictionPanel";
import Panel from './components/panel';

function App() {
  return (
    <div>
      <h2>----</h2>
      <MapViewer />
      <Panel/>
      <FileUploader />  
      <PredictionPanel />
    </div>
  );
}

export default App

