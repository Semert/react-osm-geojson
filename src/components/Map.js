import React, { useEffect, useState, useRef } from "react";

import * as Data from "../test.json";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  FeatureGroup,
  GeoJSON,
  Marker,
  useMap,
} from "react-leaflet";
import useGeo from "../hooks/useGeo";
import useOsmtoGeo from "../hooks/useOsmtoGeo";
import CustomGeo from "./CustomGeo";

const Map = () => {
  const { BaseLayer, Overlay } = LayersControl;
  const [myLocation, setMyLocation] = useState(false);
  const [opacityOfPoint, setOpacityOfPoint] = useState(0);
  const location = useGeo();
  const osmtogeo = useOsmtoGeo();

  console.log("mapData", osmtogeo.mapData);
  console.log("mapData2", osmtogeo);
  console.log("Test data", Data.default.features[0].geometry.coordinates[0]);

  return (
    <>
      <MapContainer
        center={[
          Data.default.features[0].geometry.coordinates[0][1],
          Data.default.features[0].geometry.coordinates[0][0],
        ]}
        zoom={13}
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
        {/* <GetZoom /> */}
        <LayersControl position="topright">
          <BaseLayer checked={true} name="Normal">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Dark">
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png" />
          </BaseLayer>
          <Overlay checked={true} name="Poly - without markers">
            <FeatureGroup>
              {/* <GeoJSON color="purple" data={Data.default.features} /> */}
              <CustomGeo
                color="purple"
                data={Data.default.features}
                pointer={opacityOfPoint}
              />
            </FeatureGroup>
          </Overlay>
          <Overlay name="yellow Poly - with markers">
            <CustomGeo color="yellow" data={Data.default.features} />
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

        {location.isLoaded && !location.error && (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
          ></Marker>
        )}
      </MapContainer>
      <button
        // onClick={showMyLocation}
        style={{
          background: "grey",
          zIndex: 999,
          color: "white",
          position: "absolute",
          bottom: 25,
          right: 0,
          width: 120,
          height: 55,
          cursor: "pointer",
        }}
      >
        {myLocation ? "You are here" : "Locate Me"}
      </button>
    </>
  );
};

export default Map;
