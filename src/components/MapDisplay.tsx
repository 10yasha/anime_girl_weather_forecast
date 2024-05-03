"use client";

import React from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function MapDisplay({ lat, lon }: { lat: number; lon: number }) {
  // const api_key: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const style = {
    width: "100%",
    height: "200px",
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={style}>
        <Map zoom={9} center={{ lat: lat, lng: lon }}></Map>
      </div>
    </APIProvider>
  );
}
