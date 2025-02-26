//Renders Interactive Map
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "../api"; // Centralized API requests

const MapViewer = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    axios.get("/api/visualization") // Fetch GeoJSON data from backend
      .then((response) => {
        setGeoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching geospatial data:", error);
      });
  }, []);

  return (
    <MapContainer center={[40.7128, -74.006]} zoom={10} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoData && <GeoJSON data={geoData} />}
    </MapContainer>
  );
};

export default MapViewer;
