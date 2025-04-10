import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "../api"; // Centralized API requests
import L from "leaflet";

const MapViewer = () => {
  const [geoData, setGeoData] = useState(null);
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    axios
      .get("/api/visualization/")
      .then((response) => {
        try {
          // Validate GeoJSON structure before updating the state
          const data = response.data;
          if (data && data.type === "FeatureCollection" && Array.isArray(data.features)) {
            setGeoData(data);
          } else {
            throw new Error("Invalid GeoJSON object");
          }
        } catch (validationError) {
          // Safely log the error message or the entire error object
          console.error("Error validating GeoJSON data:", validationError.message || validationError);
          setError(validationError.message || "An unknown error occurred while validating GeoJSON data"); // Update error state
        }
      })
      .catch((fetchError) => {
        console.error("Error fetching geospatial data:", fetchError);
        setError(fetchError.message); // Update error state
      });
  }, []);

  function FitBounds({ geoData }) {
    const map = useMap();
    useEffect(() => {
      if (geoData) {
        try {
          const layer = L.geoJSON(geoData);
          const bounds = layer.getBounds();
          if (
            bounds.isValid() &&
            !(
              bounds.getSouthWest().lat === bounds.getNorthEast().lat &&
              bounds.getSouthWest().lng === bounds.getNorthEast().lng
            )
          ) {
            map.fitBounds(bounds);
          } else {
            console.warn("Invalid or empty bounds.");
            map.flyTo([-0.0236, 37.9062], 6, { duration: 2 });
          }
        } catch (boundsError) {
          console.error("Error fitting bounds:", boundsError.message || boundsError);
          setError(boundsError.message || "An unknown error occurred while fitting bounds"); // Update error state
        }
      }
    }, [geoData, map]);
    return null;
  }

  return (
    <div>
      {/* Display the error if it exists */}
      {error && <div style={{ color: "red", marginBottom: "10px" }}>Error: {error}</div>}
      <MapContainer style={{ height: "600px", width: "100%" }} zoom={5} center={[0, 0]}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geoData && (
          <>
            <GeoJSON data={geoData} />
            <FitBounds geoData={geoData} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapViewer;
