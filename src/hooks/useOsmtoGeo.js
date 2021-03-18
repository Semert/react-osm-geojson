import React, { useEffect, useState } from "react";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

const useOsmtoGeo = (bbox) => {
  const [mapData, setMapData] = useState([]);
  // "https://api.openstreetmap.org/api/0.6/map?bbox=11.54,48.14,11.541,48.142"

  const fetchData = async () => {
    // try {
    //   const data2 = await axios.get(
    //     `https://api.openstreetmap.org/api/0.6/map?bbox=${bbox.min_lon},${bbox.min_lat},${bbox.max_lon},${bbox.max_lat}`
    //   );
    //   const newdata = osmtogeojson(data2.data);
    //   console.log("new", newdata);
    //   console.log("features", newdata.features);
    //   setMapData(newdata.features);
    // } catch (error) {
    //   console.log("ERROR", error);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return mapData;
};

export default useOsmtoGeo;
