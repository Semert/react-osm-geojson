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
            <b>{keyValues[0].value[index]} </b> : {keyValues[0].key[index]}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    ));
};

const GetInstance = ({ bbox, osmtogeo, getCenter, setGetCenter, getData }) => {
  const mapInstance = useMap();

  useEffect(() => {
    if (!mapInstance) return;

    if (osmtogeo?.GeoJSONData?.length > 0 && osmtogeo.error.length <= 0) {
      const geoJson = new L.GeoJSON(osmtogeo.GeoJSONData, {
        onEachFeature: (feature = {}, layer) => {
          const { properties = {} } = feature;
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
        bbox.min_lon &&
        bbox.min_lat &&
        bbox.max_lat &&
        bbox.max_lon &&
        getCenter
      ) {
        setTimeout(() => {
          mapInstance.flyTo([bbox.min_lat, bbox.min_lon], 14, {
            duration: 3,
          });
          setGetCenter(false);
        }, 1500);
      }

      osmtogeo.GeoJSONData.length = 0;
    }
  }, [getData, getCenter, osmtogeo, bbox]);

  return null;
};

export default GetInstance;
