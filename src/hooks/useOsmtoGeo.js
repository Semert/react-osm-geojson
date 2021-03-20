import React, { useEffect, useState } from "react";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

const useOsmtoGeo = (bbox, getData) => {
  const [mapData, setMapData] = useState({ GeoJSONData: [], error: "" });
  // "https://api.openstreetmap.org/api/0.6/map?bbox=11.54,48.14,11.541,48.142"

  const fetchData = async () => {
    try {
      const data2 = await axios.get(
        `https://api.openstreetmap.org/api/0.6/map?bbox=${bbox.min_lon},${bbox.min_lat},${bbox.max_lon},${bbox.max_lat}`
      );
      const newdata = osmtogeojson(data2.data);
      console.log("new", newdata);
      console.log("features", newdata.features);
      setMapData({ GeoJSONData: newdata.features, error: "" });
    } catch (error) {
      console.log(error.response.data.length);
      const errorMessage =
        error.response.data.length === 95
          ? error.response.data.substring(0, 47)
          : null;
      setMapData({ error: errorMessage ? errorMessage : error.response.data });
      console.log("ERROR", error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getData]);
  return mapData;
};

export default useOsmtoGeo;
