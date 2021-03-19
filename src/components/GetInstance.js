import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

function GetInstance({ bbox1, osmtogeo, getCenter, setGetCenter, getData }) {
  const mapInstance = useMap();

  console.log("get Center", getCenter);

  useEffect(() => {
    // const bounds = mapInstance.getBounds();
    // console.log("bounds", bounds);
    // console.log("girdi useEFFECTTTTT");
    console.log("osmmmmmmm WERORRR", osmtogeo.error);
    console.log("deneme");
    if (!mapInstance) return;
    // console.log("osmmmmmmm", osmtogeo.GeoJSONData);
    // console.log("girdi useEFFECT");

    if (osmtogeo?.GeoJSONData?.length > 0 && osmtogeo.error.length <= 0) {
      const parksGeoJson = new L.GeoJSON(osmtogeo.GeoJSONData);
      parksGeoJson.setStyle({ className: "circle-magic-kingdom" });

      setTimeout(() => {
        parksGeoJson.addTo(mapInstance);
      }, 700);

      if (
        bbox1.min_lon.length > 0 &&
        bbox1.min_lat.length > 0 &&
        bbox1.max_lat.length > 0 &&
        bbox1.max_lon.length > 0 &&
        getCenter
      ) {
        setTimeout(() => {
          mapInstance.flyTo([bbox1.min_lat, bbox1.min_lon], 14, {
            duration: 3,
          });
          setGetCenter(false);
        }, 1500);
      }

      // setTimeout(() => {
      //   parksGeoJson.remove(mapInstance);
      // }, 3000);

      // setTimeout(() => {
      //   parksGeoJson.remove(mapInstance);
      // }, 3000);
      osmtogeo.GeoJSONData.length = 0;
    }
  }, [getData, getCenter, osmtogeo]);

  return null;
}

export default GetInstance;
