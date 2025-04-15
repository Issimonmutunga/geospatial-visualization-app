import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import axios from "../api";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const FitBounds = ({ geoData }) => {
  const map = useMap();

  useEffect(() => {
    if (geoData) {
      try {
        const bounds = L.geoJSON(geoData).getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error("Bounds error:", error);
      }
    }
  }, [geoData, map]);

  return null;
};

const MapViewer = () => {
  const [geoData, setGeoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/visualization/")
      .then(({ data }) => {
        if (
          data?.type === "FeatureCollection" &&
          Array.isArray(data.features)
        ) {
          setGeoData(data);
        } else {
          throw new Error("Invalid GeoJSON format.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load map data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const onEachFeature = (feature, layer) => {
    const name = feature.properties?.name || "Unnamed Feature";
    layer.bindPopup(`<strong>${name}</strong>`);
  };

  return (
    <div className="flex w-full">
      <aside className="w-1/4 p-4 bg-gray-100 text-sm">
        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-gray-500">Loading map data...</p>}
      </aside>
      <main className="w-3/4 relative">
        <MapContainer style={{ height: "600px", width: "100%" }} center={[0, 0]} zoom={5}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {geoData && (
            <>
              <GeoJSON
                data={geoData}
                style={{ color: "blue", weight: 2 }}
                onEachFeature={onEachFeature}
              />
              <FitBounds geoData={geoData} />
            </>
          )}
        </MapContainer>
        {!geoData && !loading && error && (
          <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center text-red-600 font-bold">
            Failed to load map data.
          </div>
        )}
      </main>
    </div>
  );
};

export default MapViewer;

