// Import global CSS styling
import './App.css';

// Import necessary modules and components
import React from "react";
import MapViewer from "./components/MapViewer/MapViewer"; // Component for displaying a Leaflet map
import FileUploader from "./components/FileUploader/FileUploader"; // Component to upload files
import PredictionPanel from "./components/PredictionPanel/PredictionPanel"; // Component to make predictions
import Panel from './components/Panel/panel'; // Component to display list of uploaded files
import ErrorBoundary from './ErrorBoundary'; // Component to catch runtime errors in children

function App() {
  return (
    <div className="app"> {/* Root container */}
      <ErrorBoundary> {/* Wrap app content in error boundary for graceful failure */}
        <h1 className="app-header">VPA</h1> {/* App header */}
        <h2 className='app-subheader'>Visualize Project Analyze</h2>

        <div className="main-row"> {/* Main layout with two columns */}
          
          {/* Left column: contains upload panel, file list, and prediction panel */}
          <div className="left-column">
              <FileUploader /> {/* Component for file upload */}
              <Panel />{/* Component showing uploaded files  */}
              <PredictionPanel /> {/* Component for running predictions */}
          </div>

          {/* Right column: contains the map viewer */}
          <div className="right-column">
            <MapViewer /> {/* Map component displaying GeoJSON data */}
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App; // Export the App component as default
