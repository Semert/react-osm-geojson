import React, { useEffect, useState, useRef } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import "./Map.css";

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
import GetInstance from "./GetInstance";
import Message from "../utils/Message";
import L from "leaflet";

const Map = () => {
  const { BaseLayer, Overlay } = LayersControl;
  const [myLocation, setMyLocation] = useState(false);
  const [opacityOfPoint, setOpacityOfPoint] = useState(0);
  const [getData, setGetData] = useState(false);
  const [getCenter, setGetCenter] = useState(true);
  const magicKingdomLatLng = [28.3852, -81.5639];

  //   const [bbox, setBbox] = useState({
  //     min_lon: 11.54,
  //     min_lat: 48.14,
  //     max_lon: 11.541,
  //     max_lat: 48.142,
  //   });
  //   const [bbox, setBbox] = useState({
  //     min_lon: 12.54,
  //     min_lat: 48.14,
  //     max_lon: 12.541,
  //     max_lat: 48.142,
  //   });
  const [bbox, setBbox] = useState({
    min_lon: 12.54,
    min_lat: 48.14,
    max_lon: 17.541,
    max_lat: 48.142,
  });
  const [bbox1, setBbox1] = useState({
    min_lon: "",
    min_lat: "",
    max_lon: "",
    max_lat: "",
  });

  const location = useGeo();
  const osmtogeo = useOsmtoGeo(bbox1, getData);
  // console.log("mapData", osmtogeo);

  // console.log("mapData", osmtogeo.GeoJSONData);
  // console.log("mapData", osmtogeo.error);
  // console.log("mapData", osmtogeo[0].geometry);
  // console.log("Test data", Data.default.features[0].geometry.coordinates[0]);
  const handleSubmit = () => {
    // const osmtogeo = useOsmtoGeo(bbox1);
    setGetData((prevState) => !prevState);
    setGetCenter(true);
  };

  // console.log("bbboox", bbox1);
  // console.log("bbboox length", bbox1.min_lat.length);

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
        {/* <GetInstance /> */}
        <GetInstance
          getCenter={getCenter}
          getData={getData}
          setGetCenter={setGetCenter}
          bbox1={bbox1}
          osmtogeo={osmtogeo}
        />
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
          <Overlay checked={true} name="Purple - without markers">
            <FeatureGroup>
              {/* <GeoJSON color="purple" data={Data.default.features} /> */}

              <CustomGeo
                data={Data.default.features}
                pointer={opacityOfPoint}
                className="circle-magic-kingdom"
              />

              {/* <CustomGeo
                color="purple"
                data={osmtogeo}
                pointer={opacityOfPoint}
              /> */}
            </FeatureGroup>
          </Overlay>
          <Overlay name="Yellow - with markers">
            <CustomGeo
              color="yellow"
              data={osmtogeo.length > 0 ? osmtogeo : Data.default.features}
            />

            {/* <CustomGeo color="yellow" data={osmtogeo} /> */}
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
      <div
        style={{
          zIndex: 999,
          color: "white",
          position: "absolute",
          bottom: "15%",
          left: "17%",
          width: "70%",
          cursor: "pointer",
        }}
      >
        <Form inline>
          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>West</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={" 12.54 (min_lon)"}
              value={bbox1.min_lon}
              onChange={(e) => setBbox1({ ...bbox1, min_lon: e.target.value })}
            />
          </InputGroup>
          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>South</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={bbox1.min_lat}
              placeholder={" 48.14 (min_lat)"}
              onChange={(e) => setBbox1({ ...bbox1, min_lat: e.target.value })}
            />
          </InputGroup>

          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>East</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={bbox1.max_lon}
              placeholder={" 12.541 (max_lon)"}
              onChange={(e) => setBbox1({ ...bbox1, max_lon: e.target.value })}
            />
          </InputGroup>

          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>North</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={bbox1.max_lat}
              placeholder={" 48.142 (max_lat)"}
              onChange={(e) => setBbox1({ ...bbox1, max_lat: e.target.value })}
            />
          </InputGroup>

          <Button onClick={handleSubmit} className="mb-2">
            Submit
          </Button>

          <Form.Check
            type="checkbox"
            className="mb-2 mr-sm-2 ml-2"
            id="inlineFormCheck"
            label="Remember me"
            style={{ color: "black" }}
          />
        </Form>

        {/* <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>(West,South,East,North)</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder={" 12.54 W (min_lon)"}
            // value={bbox.min_lon}
            onChange={(e) => setBbox(e.target.value)}
          />
          <FormControl
            // value={bbox.max_lat}
            placeholder={" 48.14 S (min_lat)"}
            onChange={(e) => setBbox(e.target.value)}
          />
          <FormControl
            // value={bbox.max_lon}
            placeholder={" 12.541 E (max_lon)"}
            onChange={(e) => setBbox(e.target.value)}
          />
          <FormControl
            // value={bbox.max_lat}
            placeholder={" 48.142 N (max_lat)"}
            onChange={(e) => setBbox(e.target.value)}
          />
        </InputGroup>
        <Button type="button" className="mb-2">
          Submit
        </Button> */}
      </div>

      <Button
        className="btn btn-primary"
        style={{
          zIndex: 999,
          color: "white",
          position: "absolute",
          bottom: 45,
          right: 12,
          cursor: "pointer",
        }}
      >
        {myLocation ? "You are here" : "Locate Me"}
      </Button>

      {osmtogeo.error && (
        <Message variant={"danger"} children={osmtogeo.error} />
      )}
    </>
  );
};

export default Map;
