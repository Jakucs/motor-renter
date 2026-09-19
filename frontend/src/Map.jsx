import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import { authFetch } from "./utils/authFetch";

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

       const mapRef = useRef(null);

        const onMapLoad = (map) => {
            mapRef.current = map;
        };

  useEffect(() => {
      let didRespond = false;

      //indulunk a BP centertől
      const fallbackTimer = setTimeout(() => {
          if (!didRespond) {
              setCenter({ lat: 47.4979, lng: 19.0402 });
          }
      }, 6000);

      navigator.geolocation.getCurrentPosition(
          (position) => {
              //ha megvan a position beállítjuk
              didRespond = true;
              //töröljük a timert, nemkell fallback
              clearTimeout(fallbackTimer);
              const newCenter = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              setCenter(newCenter);
              //átmozdítjuk a current position-re a térképet
              if (mapRef.current) {
                  mapRef.current.panTo(newCenter);
              }
          },
          (err) => {
            //ha nincs position, marad a center
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
          const res = await authFetch("http://localhost:8080/api/drivers/active");
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
        onLoad={onMapLoad}
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