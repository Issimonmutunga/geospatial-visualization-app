// Import global CSS styling
import './App.css';

import React from "react";
import MapViewer from "./components/MapViewer/MapViewer";
import FileUploader from "./components/FileUploader/FileUploader";
import PredictionPanel from "./components/PredictionPanel/PredictionPanel";
import Panel from './components/Panel/Panel';
import ErrorBoundary from './ErrorBoundary';
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <header className="app-header">
          <h1>VPA</h1>
          <h2 className="app-subheader">Visualize Project Analyze</h2>
        </header>

        <main className="main-row">
          <section className="left-column">
            <div className="card"><FileUploader /></div>
            <div className="card"><Panel /></div>
            <div className="card"><PredictionPanel /></div>
          </section>

          <section className="right-column">
            <div className="card map-card"><MapViewer /></div>
          </section>
        </main>

        <footer className="bottom">
          <Footer />
        </footer>
      </ErrorBoundary>
    </div>
  );
}

export default App;
