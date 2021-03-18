import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import * as Data from "./test.json";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

const App = () => {
  const { BaseLayer, Overlay } = LayersControl;

  console.log("Test data", Data.default.features);

  return (
    <div className="App">
      <MapContainer
        center={[41.00824, 28.978359]}
        zoom={12}
        doubleClickZoom={true}
        animate={true}
        duration={100}
        bounceAtZoomLimits={true}
        maxBoundsViscosity={0.95}
        maxBounds={[
          [-360, -180],
          [360, 180],
        ]}
      >
        <LayersControl position="topright">
          <BaseLayer name="Normal">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer checked={true} name="Dark">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png" />
          </BaseLayer>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default App;
