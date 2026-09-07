import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "400px"
};

/* const center = {
  lat: 47.4979,
  lng: 19.0402
}; */

function Map() {
   const [center, setCenter] = useState({ lat: 47.4979, lng: 19.0402 });

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter( {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }, [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) return <div>Térkép betöltése...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
    />
  );
}

export default Map;