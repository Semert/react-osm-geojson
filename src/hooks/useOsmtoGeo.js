import React, { useEffect, useState } from "react";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

const useOsmtoGeo = () => {
  const [mapData, setMapData] = useState([]);
  const [bbox, setBbox] = useState({
    min_lon: 11.54,
    min_lat: 48.14,
    max_lon: 11.541,
    max_lat: 48.142,
  });
  const fetchData = async () => {
    try {
      const data2 = await axios.get(
        `https://api.openstreetmap.org/api/0.6/map?bbox=${bbox.min_lon},${bbox.min_lat},${bbox.max_lon},${bbox.max_lat}`
      );
      // "https://api.openstreetmap.org/api/0.6/map?bbox=11.54,48.14,11.541,48.142"

      const newdata = osmtogeojson(data2.data);
      console.log("new", newdata);

      console.log("features", newdata.features);
      setMapData(newdata.features);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return mapData;
};

export default useOsmtoGeo;
