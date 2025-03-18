// Renders Interactive Map
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "../api"; // Centralized API requests
import L from "leaflet";

const MapViewer = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    axios.get("/api/visualization")
      .then((response) => {
        setGeoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching geospatial data:", error);
      });
  }, []);

  function FitBounds({ geoData }) {
    const map = useMap();
    useEffect(() => {
      if (geoData) {
        const bounds = L.geoJSON(geoData).getBounds();
        map.fitBounds(bounds);
      }
    }, [geoData, map]);
    return null;
  }

  return (
    <MapContainer style={{ height: "500px", width: "100%" }} zoom={2} center={[0, 0]}>
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
