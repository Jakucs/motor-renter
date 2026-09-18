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
   const [center, setCenter] = useState(null);
   const [activeDrivers, setActiveDrivers] = useState([]);

  useEffect(() => {
      let didRespond = false;

      const fallbackTimer = setTimeout(() => {
          if (!didRespond) {
              setCenter({ lat: 47.4979, lng: 19.0402 });
          }
      }, 6000);

      navigator.geolocation.getCurrentPosition(
          (position) => {
              didRespond = true;
              clearTimeout(fallbackTimer);
              const newCenter = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              setCenter(newCenter);
              if (mapRef.current) {
                  mapRef.current.panTo(newCenter);
              }
          },
          (err) => {
              didRespond = true;
              clearTimeout(fallbackTimer);
              setCenter({ lat: 47.4979, lng: 19.0402 });
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
      );

      return () => clearTimeout(fallbackTimer);
  }, []);

    //2. USEFFECT
    useEffect(() => {
      const fetchActiveDrivers = async () => {
        try {
          const res = await fetch("http://localhost:8080/api/drivers/active");
          if (res.ok) {
            const data = await res.json();
            console.log("active drivers:", data);
            setActiveDrivers(data);
          }
        } catch (err) {
          console.error("Failed to load active drivers:", err);
        }
      };

      fetchActiveDrivers();
      //egyenlőre 5másodpercenként frissítjük az aktuális position -t
      const interval = setInterval(fetchActiveDrivers, 5000);
      return () => clearInterval(interval);
    }, []);


    const { isLoaded } = useLoadScript({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    if (!isLoaded) return <div>Térkép betöltése...</div>;

    //KÖVETÉSHEZ ID
    const userId = localStorage.getItem("userId");

if (!isLoaded) return <div>Térkép betöltése...</div>;

return center ? (
    <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={{ gestureHandling: "greedy" }}
    >
        {/* saját pozíció */}
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

        {/* aktív sofőrök (saját magunkat kihagyva) */}
        {activeDrivers
            .filter((d) => String(d.userId) !== userId)
            .map((driver) => (
                <Marker
                    key={`${driver.userId}-${driver.lat}-${driver.lng}`}
                    position={{ lat: driver.lat, lng: driver.lng }}
                    icon={{
                        url: "/moto-marker.png",
                        scaledSize: new window.google.maps.Size(36, 36)
                    }}
                />
            ))}
    </GoogleMap>
) : <div>Helymeghatározás...</div>;
}

export default Map;