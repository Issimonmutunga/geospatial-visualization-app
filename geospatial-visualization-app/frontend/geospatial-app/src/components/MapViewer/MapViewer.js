// Import necessary libraries and components
import React, { useState, useEffect } from "react"; // React and hooks (useState, useEffect)
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet"; // Leaflet components for rendering maps and geo-data
import axios from "../../api"; // Axios instance for making HTTP requests
import L from "leaflet"; // Leaflet library for map manipulations
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for map styling
import "./MapViewer.css"; // Custom CSS for MapViewer component

// Component to fit the map bounds to the GeoJSON data
const FitBounds = ({ geoData }) => {
  const map = useMap(); // Access the map instance from react-leaflet

  useEffect(() => {
    if (geoData) {
      try {
        // Get bounds from the GeoJSON data and fit the map to those bounds
        const bounds = L.geoJSON(geoData).getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds); // Fit map to the geoData bounds
        }
      } catch (error) {
        console.error("Bounds error:", error); // Catch any errors in bounds calculation
      }
    }
  }, [geoData, map]); // Run this effect when geoData or map changes

  return null; // This component doesn't render anything itself
};

// Main MapViewer component
const MapViewer = () => {
  const [geoData, setGeoData] = useState(null); // State to hold GeoJSON data
  const [error, setError] = useState(null); // State for any errors while fetching data
  const [loading, setLoading] = useState(true); // Loading state while fetching data

  useEffect(() => {
    // Fetch GeoJSON data from the API
    axios
      .get("/api/visualization/")
      .then(({ data }) => {
        // Validate the data is in the correct GeoJSON format
        if (
          data?.type === "FeatureCollection" &&
          Array.isArray(data.features)
        ) {
          setGeoData(data); // Set the GeoJSON data in state
        } else {
          throw new Error("Invalid GeoJSON format."); // Handle invalid data format
        }
      })
      .catch((err) => {
        console.error(err); // Log error
        setError("Failed to load map data."); // Set error message
      })
      .finally(() => setLoading(false)); // Set loading to false after fetch attempt
  }, []); // Empty dependency array to run effect only once on mount

  // Function to bind popups to each feature in the GeoJSON data
  const onEachFeature = (feature, layer) => {
    const name = feature.properties?.name || "Unnamed Feature"; // Get feature name or default to "Unnamed Feature"
    layer.bindPopup(`<strong>${name}</strong>`); // Bind a popup to the layer
  };

  return (
    <div className="flex w-full">
      <aside className="mapviewer-sidebar w-1/4">
        {/* Display error or loading state in the sidebar */}
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-gray-500">Loading map data...</p>}
      </aside>
      <main className="w-3/4 relative">
        {/* Map container to display the map */}
        <MapContainer className="mapviewer-map" center={[0, 0]} zoom={5}>
          {/* Tile layer from OpenStreetMap */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {geoData && (
            <>
              {/* Display GeoJSON data as a map layer */}
              <GeoJSON
                data={geoData}
                style={{ color: "blue", weight: 2 }} // Style for GeoJSON features
                onEachFeature={onEachFeature} // Attach popups to each feature
              />
              {/* Fit map bounds to the loaded GeoJSON data */}
              <FitBounds geoData={geoData} />
            </>
          )}
        </MapContainer>
      </main>
    </div>
  );
};

export default MapViewer; // Export MapViewer component for use elsewhere
