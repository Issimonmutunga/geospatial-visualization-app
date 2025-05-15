import { useContext, useEffect } from "react";
import { MapContext } from "../MapContext";
import L from "leaflet";

export default function ShapefileLayer() {
    const map = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        fetch("/api/shapefile") // Replace with your actual endpoint
            .then(res => res.json()) // Corrected: added parentheses to `.json()`
            .then(data => {
                L.geoJSON(data).addTo(map);
            })
            .catch(err => console.error("Failed to load shapefile data:", err)); // Optional error handling
    }, [map]);

    return null;
}
