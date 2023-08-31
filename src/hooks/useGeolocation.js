import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { position, isLoading, error, getPosition };
}
