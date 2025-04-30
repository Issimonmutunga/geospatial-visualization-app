// Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import global CSS styling
import './index.css';

// Import the root App component and performance reporting utility
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root and render the App component inside <React.StrictMode>
// StrictMode helps highlight potential problems during development
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Measure app performance by passing a logging or analytics function
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
