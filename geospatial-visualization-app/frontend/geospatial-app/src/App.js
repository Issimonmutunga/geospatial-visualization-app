import './App.css';
import React from "react";
import MapViewer from "./components/MapViewer";
import FileUploader from "./components/FileUploader";
import PredictionPanel from "./components/PredictionPanel";
import Panel from './components/panel';
import ErrorBoundary from './ErrorBoundary'

function App() {
  return (
<div>
<ErrorBoundary>
<h2>Yed GIS</h2>
      <FileUploader />

      {/* Main row: Left panel (25%) and MapViewer (75%) */}
      <div style={{ display: "flex", height: "80vh", marginTop: "10px" }}>
        
        {/* Left column: Panel + PredictionPanel stacked */}
        <div style={{ width: "25%", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, overflowY: "auto", borderBottom: "1px solid #ccc" }}>
            <Panel />
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <PredictionPanel />
          </div>
        </div>

        {/* Right column: MapViewer */}
        <div style={{ width: "75%", height: "100%" }}>
          <MapViewer />
        </div>
      </div>
</ErrorBoundary>
    </div>
  );
}

export default App;
