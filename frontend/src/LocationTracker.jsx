import { useEffect } from "react";
import { authFetch } from "./utils/authFetch";

function LocationTracker({ role, isActive }) {

                        //lat: position.coords.latitude,
                        //lng: position.coords.longitude

/*                         lat: 47.5100,
                        lng: 19.0500 */
    //ÚJ USEEFFFFFFFFFFFFFFFFFFFFFFFECT
    //AMÍG A SOFŐR AKTÍV, ADDIG KÜLDI A USER A POZÍCIÓT
    useEffect(() => {
        console.log("LocationTracker role:", role, "isActive:", isActive);
        if (role !== "DRIVER" || !isActive) return;
        
        // egyenlőre a böngészőtől kérjük le a locationt ,ha gps-t kapcsolunk áttvált a gps koordinátáira
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                authFetch(`http://localhost:8080/api/profile/location`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                }).catch((err) => console.error("Location update failed:", err));
            },
            (err) => console.error("Geolocation error:", err),
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );
        //clearWatchal leállítjukl a figyelést
        return () => navigator.geolocation.clearWatch(watchId);
    }, [role, isActive]);

        // ÚJ USEEFFECT HEARTBEAT
        useEffect(() => {
            if (role !== "DRIVER" || !isActive) return;

            const sendHeartbeat = () => {
                authFetch(`http://localhost:8080/api/profile/heartbeat`, {
                    method: "PUT"
                }).catch((err) => console.error("Heartbeat failed:", err));
            };

            sendHeartbeat(); // azonnal küldünk egyet, ne kelljen 20 mp-et várni az elsőre
            const heartbeatInterval = setInterval(sendHeartbeat, 20000); // 20 másodpercenként

            return () => clearInterval(heartbeatInterval);
        }, [role, isActive]);
}

export default LocationTracker;