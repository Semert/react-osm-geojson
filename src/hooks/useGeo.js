import { useState, useEffect } from "react";

const useGeo = () => {
  const [location, setLocation] = useState({
    isLoaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const handleSuccess = (location) => {
    setLocation({
      isLoaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const handleError = (error) => {
    setLocation({
      isLoaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "There is something wrong!",
      });
    }

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return location;
};

export default useGeo;
