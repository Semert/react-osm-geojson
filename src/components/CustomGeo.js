import React, { useRef, useEffect } from "react";
import { GeoJSON } from "react-leaflet";

const CustomGeo = (props) => {
  const layerRef = useRef(null);
  const { data, ...otherProps } = props;
  function addData(layer, jsonData) {
    layer.addData(jsonData);
  }
  function onEachFeature(feature, layer) {
    if (layer.feature.geometry.type === "Point") {
      if (props.pointer === 0) {
        layer.options.opacity = props.pointer;
      } else {
        layer.bindPopup(`${"Selam"}`);
      }
    }
  }
  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props.data]);
  return (
    <GeoJSON ref={layerRef} {...otherProps} onEachFeature={onEachFeature} />
  );
};

export default CustomGeo;
