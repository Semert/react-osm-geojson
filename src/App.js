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
  Marker,
  useMap,
} from "react-leaflet";
import useGeo from "./hooks/useGeo";
const App = () => {
  const { BaseLayer, Overlay } = LayersControl;
  const mapRef = useRef();
  const [myLocation, setMyLocation] = useState(false);

  const location = useGeo();

  // function GetZoom() {
  //   const mapInstance = useMap();

  //   useEffect(() => {
  //     const zoom = mapInstance.getZoom();
  //     if (location.isLoaded && !location.error && myLocation) {
  //       console.log("girdi mi");
  //       mapInstance.flyTo(
  //         [location.coordinates.lat, location.coordinates.lng],
  //         13,
  //         {
  //           animate: true,
  //         }
  //       );
  //     } else {
  //       alert(location?.error?.message);
  //     }
  //     // if (myLocation) {
  //     //   mapInstance.flyTo(
  //     //     [location.coordinates.lat, location.coordinates.lng],
  //     //     13,
  //     //     {
  //     //       animate: true,
  //     //     }
  //     //   );
  //   }, [myLocation, location]);

  //   return null;
  // }
  console.log("locaiton", location);

  const showMyLocation = () => {
    setMyLocation((prevState) => true);
    // if (location.isLoaded && !location.error) {
    //   console.log("girdi mi");
    //   const b = mapRef.current.leafletElement && mapRef.current.leafletElement;
    //   b &&
    //     b.flyTo([location.coordinates.lat, location.coordinates.lng], 13, {
    //       animate: true,
    //     });
    // } else {
    //   alert(location?.error?.message);
    // }
  };
  console.log("Test data", Data.default.features[0].geometry.coordinates[0]);

  return (
    <div className="App">
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
        innerRef={mapRef}
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

        {location.isLoaded && !location.error && (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
          ></Marker>
        )}
      </MapContainer>
      <button
        onClick={showMyLocation}
        style={{
          background: "grey",
          zIndex: 999,
          color: "white",
          position: "absolute",
          top: 50,
          right: 0,
          width: 200,
          height: 75,
          cursor: "pointer",
        }}
      >
        {myLocation ? "You are here" : "Locate Me"}
      </button>
    </div>
  );
};

export default App;
