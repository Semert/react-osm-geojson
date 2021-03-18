import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import * as Data from "./test.json";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  FeatureGroup,
  GeoJSON,
} from "react-leaflet";
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
          <Overlay checked={true} name="Poly - without markers">
            <FeatureGroup>
              <GeoJSON color="purple" data={Data.default.features} />
            </FeatureGroup>
          </Overlay>
          <Overlay name="yellow Poly - with markers">
            <GeoJSON color="yellow" data={Data.default.features} />
          </Overlay>
          <Overlay name="Marker with popup">
            <CircleMarker
              center={[41.00824, 28.978359]}
              color="red"
              radius={20}
            >
              <Popup>Popup in CircleMarker</Popup>
            </CircleMarker>
          </Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default App;
