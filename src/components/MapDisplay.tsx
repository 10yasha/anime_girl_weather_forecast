import { useState, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import "./MapDisplay.css";

export default function MapDisplay({ lat, lon }: { lat: number; lon: number }) {
  const api_key: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [currentLatLon, setCurrentLatLon] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    setCurrentLatLon({ lat: lat, lng: lon });
  }, [lat, lon]);

  return (
    <APIProvider apiKey={api_key}>
      <div className="map-box">
        {currentLatLon && (
          <Map
            defaultZoom={10}
            center={{ lat: currentLatLon.lat, lng: currentLatLon.lng }}
            onCenterChanged={(e) => {
              setCurrentLatLon(e.detail.center);
            }}
          ></Map>
        )}
      </div>
    </APIProvider>
  );
}
