import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import * as Data from "./test.json";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

const App = () => {
  console.log("Test data", Data.default.features);

  return (
    <div className="App">
      <MapContainer center={[41.00824, 28.978359]} zoom={12}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default App;
