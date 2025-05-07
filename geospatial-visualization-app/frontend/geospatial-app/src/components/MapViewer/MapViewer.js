import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapViewer.css";

const MapViewer = () => {
  const defaultCenter = [30, 10];
  const defaultZoom = 2;

  return (
    <div className="mapviewer-map">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="mapviewer-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
      </MapContainer>
    </div>
  );
};

export default MapViewer;
