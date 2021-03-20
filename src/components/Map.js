import React, { useEffect, useState, useRef } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import "./Map.css";

import * as easterEgg from "../utils/easterEgg.json";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  FeatureGroup,
} from "react-leaflet";
import useGeo from "../hooks/useGeo";
import useOsmtoGeo from "../hooks/useOsmtoGeo";
import CustomGeo from "./CustomGeo";
import GetInstance from "./GetInstance";
import Message from "../utils/Message";
import Popovers from "../utils/Popovers";
import LocateMe from "./LocateMe";
import GetLocation from "./GetLocation";
import Aos from "aos";
import "aos/dist/aos.css";

const Map = () => {
  const { BaseLayer, Overlay } = LayersControl;
  const [myLocation, setMyLocation] = useState(false);
  const [opacityOfPoint, setOpacityOfPoint] = useState(0);
  const [getData, setGetData] = useState(false);
  const [getCenter, setGetCenter] = useState(false);
  const [isFilled, setIsFilled] = useState(true);

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

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const handleSubmit = () => {
    setGetData((prevState) => !prevState);
    setIsFilled((prevState) => !prevState);

    setGetCenter(true);
  };

  const handleFill = () => {
    const newBbox = {
      min_lon: 12.5,
      min_lat: 48.14,
      max_lon: 12.52,
      max_lat: 48.142,
    };
    setBbox1(newBbox);
  };

  const handleLocate = () => {
    setMyLocation((prevState) => !prevState);
  };

  return (
    <>
      <MapContainer
        center={[52.535927, 13.418123]}
        zoom={17}
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
        <GetInstance
          getCenter={getCenter}
          getData={getData}
          setGetCenter={setGetCenter}
          bbox1={bbox1}
          osmtogeo={osmtogeo}
          isFilled={isFilled}
        />
        <LocateMe location={location} myLocation={myLocation} />
        <GetLocation />
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

          <BaseLayer name="NASA Gibs Blue Marble">
            <TileLayer
              url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
              attribution="&copy; NASA Blue Marble, image service by OpenGeo"
              maxNativeZoom={8}
            />
          </BaseLayer>

          <Overlay checked={true} name="Star">
            <FeatureGroup>
              <CustomGeo
                data={easterEgg.default.features}
                pointer={opacityOfPoint}
                className="circle-magic-kingdom"
              />
            </FeatureGroup>
          </Overlay>
          {/* <FeatureGroup>
            <DrawMap />
          </FeatureGroup> */}

          <Overlay name="Circle">
            <CircleMarker
              center={[52.535927, 13.418123]}
              color="red"
              radius={20}
            >
              <Popup>Hey There!</Popup>
            </CircleMarker>
          </Overlay>
        </LayersControl>
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
        <Form inline data-aos="fade-up">
          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>N</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={bbox1.max_lat}
              placeholder={" 48.142 (max_lat)"}
              onChange={(e) => setBbox1({ ...bbox1, max_lat: e.target.value })}
              type="number"
            />
          </InputGroup>
          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>S</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={bbox1.min_lat}
              placeholder={" 48.14 (min_lat)"}
              onChange={(e) => setBbox1({ ...bbox1, min_lat: e.target.value })}
              type="number"
            />
          </InputGroup>

          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>E</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={bbox1.max_lon}
              placeholder={" 12.541 (max_lon)"}
              onChange={(e) => setBbox1({ ...bbox1, max_lon: e.target.value })}
              type="number"
            />
          </InputGroup>

          <InputGroup className="mb-2 mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>W</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={" 12.54 (min_lon)"}
              value={bbox1.min_lon}
              onChange={(e) => setBbox1({ ...bbox1, min_lon: e.target.value })}
              type="number"
            />
          </InputGroup>
          <Button onClick={handleSubmit} className="mb-2">
            Submit
          </Button>
          <Popovers handleFill={handleFill} />
        </Form>
      </div>

      <Button
        className={`locate-me-button btn ${
          location?.error ? "btn-danger" : "btn-primary"
        }`}
        onClick={handleLocate}
        disabled={location?.error && true}
      >
        {!location?.error ? "Locate Me" : "Locate Me Disabled"}
      </Button>

      {osmtogeo.error.length === 88 ? (
        <Message variant={"info"} children={osmtogeo.error} />
      ) : (
        osmtogeo.error && (
          <Message variant={"danger"} children={osmtogeo.error} />
        )
      )}
    </>
  );
};

export default Map;
