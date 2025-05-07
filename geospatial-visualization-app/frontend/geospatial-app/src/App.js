// Import global CSS styling
import './App.css';
import React, { useState } from 'react';
import MapViewer from './components/MapViewer/MapViewer';
import FileUploader from './components/FileUploader/FileUploader';
import PredictionPanel from './components/PredictionPanel/PredictionPanel';
import Panel from './components/Panel/Panel';
import ErrorBoundary from './ErrorBoundary';
import Footer from './components/Footer/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState('fileUploader'); // Default to FileUploader

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      // Trigger map resize if opening the menu and MapViewer is visible
      if (newState && window.map) {
        setTimeout(() => window.map.invalidateSize(), 0); // Adjust for your map library
      }
      return newState;
    });
  };

  const handleCardSelect = (card) => {
    setActiveCard(card);
  };

  // Map of card components for cleaner rendering
  const cardComponents = {
    fileUploader: <FileUploader />,
    panel: <Panel />,
    predictionPanel: <PredictionPanel />,
  };

  return (
    <div className={`app ${isMenuOpen ? 'menu-open' : ''}`}>
      <ErrorBoundary>
        <button
          className="menu-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✖ Close' : '☰ Menu'}
        </button>

        <header className="app-header">
          <h1>VPA</h1>
          <h2 className="app-subheader">Visualize Project Analyze</h2>
        </header>

        <main className="main-row">
          <section className="left-column">
            {/* Sidebar for card selection */}
            <nav className="sidebar">
              <button
                className={`sidebar-item ${activeCard === 'fileUploader' ? 'active' : ''}`}
                onClick={() => handleCardSelect('fileUploader')}
                aria-current={activeCard === 'fileUploader' ? 'true' : 'false'}
              >
                File Uploader
              </button>
              <button
                className={`sidebar-item ${activeCard === 'panel' ? 'active' : ''}`}
                onClick={() => handleCardSelect('panel')}
                aria-current={activeCard === 'panel' ? 'true' : 'false'}
              >
                Panel
              </button>
              <button
                className={`sidebar-item ${activeCard === 'predictionPanel' ? 'active' : ''}`}
                onClick={() => handleCardSelect('predictionPanel')}
                aria-current={activeCard === 'predictionPanel' ? 'true' : 'false'}
              >
                Prediction Panel
              </button>
            </nav>

            {/* Single card display */}
            <div className="card-container">
              <div className="card">{cardComponents[activeCard]}</div>
            </div>
          </section>

          <section className="right-column">
            <div className="card map-card">
              <MapViewer />
            </div>
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