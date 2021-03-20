import { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import { geosearch } from "esri-leaflet-geocoder";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

const GetLocation = () => {
  const mapInstance = useMap();
  const [coor, setCoor] = useState(null);

  useEffect(() => {
    if (!mapInstance) return;

    const control = geosearch();

    control.addTo(mapInstance);

    control.on("results", handleOnSearchResuts);

    control.getContainer().onclick = () => {
      mapInstance.setZoom(3);
    };
  }, []);

  const handleOnSearchResuts = (data) => {
    setCoor(data.latlng);
  };
  return <>{coor ? <Marker position={coor} /> : null}</>;
};

export default GetLocation;
