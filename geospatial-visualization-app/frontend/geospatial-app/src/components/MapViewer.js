// Renders Interactive Map 
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "../api"; // Centralized API requests
import L from "leaflet";

const MapViewer = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    axios.get("/api/visualization/")
      .then((response) => {
        setGeoData(response.data); //3/19/2025
      })
      .catch((error) => {
        console.error("Error fetching geospatial data:", error);
      });
  }, []);

  function FitBounds({ geoData }) {
    const map = useMap();
    // Start here 3/25/2025 -- Invalid bounds + fallback with smooth animation
    useEffect(() => {
      if (geoData) {
        const layer = L.geoJSON(geoData)
        const bounds = layer.getBounds();
        if (
          bounds.isValid() && // Check if Leaflet recognizes the bounds as valid
          !(
            bounds.getSouthWest().lat === bounds.getNorthEast().lat &&
            bounds.getSouthWest().lng === bounds.getNorthEast().lng
          )
        ) {
          map.fitBounds(bounds);
        } else {
          console.warn("Invalid or empty bounds.");
          map.flyTo([-0.0236, 37.9062], 6, { duration: 2 }); // Smooth animated fallback
        }
      }
    }, [geoData, map]);
    return null;
  }

  return (
    <MapContainer style={{ height: "600px", width: "100%" }} zoom={10} center={[0, 0]}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoData && (
        <>
          <GeoJSON data={geoData} />
          <FitBounds geoData={geoData} />
        </>
      )}
    </MapContainer>
  );
};

export default MapViewer;
