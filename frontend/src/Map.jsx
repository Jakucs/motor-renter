import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "70vh"
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
    >
      <Marker 
      position={center}
        icon={{
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: 2,
      }}
      />
    </GoogleMap>
  );
}

export default Map;