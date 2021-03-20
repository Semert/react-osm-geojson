import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import ReactDOMServer from "react-dom/server";

const CustomReactPopup = ({ keyValues }) => {
  const maxLen = keyValues[0].key.length > 5 ? 7 : 5;
  return Array(maxLen)
    .fill(0)
    .map((x, index) => (
      <Card
        style={{
          width: "10rem",
          fontSize: 11,
          overflow: "hidden",
        }}
      >
        <ListGroup variant="flush">
          <ListGroup.Item>
            {" "}
            <b>{keyValues[0].value[index]} </b> : {keyValues[0].key[index]}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    ));
};

function GetInstance({
  bbox1,
  osmtogeo,
  getCenter,
  setGetCenter,
  getData,
  isFilled,
}) {
  const mapInstance = useMap();

  useEffect(() => {
    // const bounds = mapInstance.getBounds();
    // console.log("bounds", bounds);

    console.log("Use EFFECT");

    console.log(osmtogeo);
    if (!mapInstance) return;

    if (osmtogeo?.GeoJSONData?.length > 0 && osmtogeo.error.length <= 0) {
      const geoJson = new L.GeoJSON(osmtogeo.GeoJSONData, {
        onEachFeature: (feature = {}, layer) => {
          const { properties = {} } = feature;
          const { name } = properties;
          const valuesOfProp = [properties].map((val) => {
            return [{ key: Object.values(val), value: Object.keys(val) }];
          });

          const keyValues = valuesOfProp.map((x) => x[0]);

          layer
            .bindPopup(
              ReactDOMServer.renderToString(
                <CustomReactPopup keyValues={keyValues} />
              )
            )
            .openPopup();
        },
      });

      geoJson.setStyle({ className: "circle-magic-kingdom" });

      setTimeout(() => {
        geoJson.addTo(mapInstance);
      }, 700);

      if (
        bbox1.min_lon > 0 &&
        bbox1.min_lat > 0 &&
        bbox1.max_lat > 0 &&
        bbox1.max_lon > 0 &&
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
      //   geoJson.remove(mapInstance);
      // }, 3000);

      osmtogeo.GeoJSONData.length = 0;
    }
  }, [getData, getCenter, osmtogeo]);

  return null;
}

export default GetInstance;
