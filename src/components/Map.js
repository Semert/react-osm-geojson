import React, { useEffect, useState } from "react";
import * as easterEgg from "../utils/easterEgg.json";
import useGeo from "../hooks/useGeo";
import useOsmtoGeo from "../hooks/useOsmtoGeo";
import CustomGeo from "./CustomGeo";
import GetInstance from "./GetInstance";
import Message from "../utils/Message";
import LocateMe from "./LocateMe";
import GetLocation from "./GetLocation";
import BboxValues from "./BboxValues";
import Aos from "aos";
import { Button } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  FeatureGroup,
} from "react-leaflet";
import "aos/dist/aos.css";
import "./Map.css";

const Map = () => {
  const { BaseLayer, Overlay } = LayersControl;
  const [myLocation, setMyLocation] = useState(false);
  const [opacityOfPoint] = useState(0);
  const [getData, setGetData] = useState(false);
  const [getCenter, setGetCenter] = useState(false);
  const [isFilled, setIsFilled] = useState(true);
  const [bbox, setBbox] = useState({
    min_lon: "",
    min_lat: "",
    max_lon: "",
    max_lat: "",
  });

  const location = useGeo();
  const osmtogeo = useOsmtoGeo(bbox, getData);

  const handleSubmit = () => {
    setGetData((prevState) => !prevState);
    setIsFilled((prevState) => !prevState);
    setGetCenter(true);
  };

  const handleFill = () => {
    const newBbox = {
      min_lon: 11.54,
      min_lat: 48.14,
      max_lon: 11.541,
      max_lat: 48.141,
    };
    setBbox(newBbox);
  };

  const handleLocate = () => {
    setMyLocation((prevState) => !prevState);
  };

  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);

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
        attribution={"Mert Efe"}
      >
        <GetInstance
          getCenter={getCenter}
          getData={getData}
          setGetCenter={setGetCenter}
          bbox={bbox}
          osmtogeo={osmtogeo}
          isFilled={isFilled}
        />
        <LocateMe location={location} myLocation={myLocation} />
        <GetLocation />
        <LayersControl position="topright">
          <BaseLayer checked={true} name="Normal">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &amp; Mert Efe '
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Dark">
            <TileLayer
              attribution="Mert Efe"
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
            />
          </BaseLayer>

          <BaseLayer name="NASA Gibs Blue Marble">
            <TileLayer
              url="https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg"
              attribution="&copy; NASA Blue Marble, image service by OpenGeo  &amp; Mert Efe"
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

      <BboxValues
        bbox={bbox}
        handleFill={handleFill}
        handleSubmit={handleSubmit}
        setBbox={setBbox}
      />

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
