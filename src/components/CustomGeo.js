import React, { useRef, useEffect } from "react";
import { GeoJSON } from "react-leaflet";

const CustomGeo = (props) => {
  const layerRef = useRef(null);
  const { data, ...otherProps } = props;
  function addData(layer, jsonData) {
    layer.addData(jsonData);
  }
  function onEachFeature(feature, layer) {
    if (feature?.properties) {
      const { name } = feature.properties;
      console.log("Names", `${name}`);
      layer.bindPopup(`${name}`);
    }
  }
  useEffect(() => {
    console.log("GeoJson Ref", layerRef);
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props.data]);
  return (
    <GeoJSON ref={layerRef} {...otherProps} onEachFeature={onEachFeature} />
  );
};

export default CustomGeo;
