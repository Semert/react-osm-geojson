import React, { useRef, useEffect } from "react";
import { GeoJSON } from "react-leaflet";

const CustomGeo = (props) => {
  const layerRef = useRef(null);
  const { data, ...otherProps } = props;
  function addData(layer, jsonData) {
    layer.addData(jsonData);
  }
  function onEachFeature(feature, layer) {
    // console.log("featıure", feature);
    // console.log("layer", layer);

    // if (layer.feature.geometry.type === "LineString") {
    //   const { name } = feature.properties;
    //   console.log("Names", `${name}`);
    //   layer.bindPopup(`${name}`);
    // }

    if (layer.feature.geometry.type === "Point") {
      if (props.pointer === 0) {
        layer.options.opacity = props.pointer;
      } else {
        // layer.bindPopup(`${"Selam"}`).on("click", function () {
        //   alert("Clicked on a member of the group!");
        // });
        layer.bindPopup(`${"Selam"}`);
      }
    }

    // if (feature?.properties) {
    //   const { name } = feature.properties;
    //   console.log("Names", `${name}`);
    //   layer.bindPopup(`${name}`);
    // }
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
