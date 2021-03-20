import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

const LocateMe = ({ location, myLocation }) => {
  const mapInstance = useMap();

  useEffect(() => {
    if (!mapInstance) return;

    if (location.isLoaded && location.error === undefined && myLocation) {
      mapInstance.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        13,
        {
          animate: true,
        }
      );
    } else if (location?.error?.message !== undefined && myLocation) {
      alert(location?.error?.message);
    }
  }, [myLocation, location]);

  return (
    <>
      {location.coordinates ? (
        <Marker position={[location.coordinates.lat, location.coordinates.lng]}>
          <Popup>
            You're <b>"approximately" </b>here
          </Popup>
        </Marker>
      ) : null}
    </>
  );
};

export default LocateMe;
