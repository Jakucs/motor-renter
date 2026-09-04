import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px"
};

const center = {
  lat: 47.4979,
  lng: 19.0402
};

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDr5bLi8peD34UcxnphrDGX0o6fe7AMvjk"
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