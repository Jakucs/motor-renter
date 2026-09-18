import { useEffect } from "react";
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
        const userId = localStorage.getItem("userId");
        // egyenlőre a böngészőtől kérjük le a locationt ,ha gps-t kapcsolunk áttvált a gps koordinátáira
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                console.log("sending location:", 47.5100, 19.0500);
                fetch(`http://localhost:8080/api/profile/${userId}/location`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lat: 47.5100,
                        lng: 19.0500
                    })
                }).catch((err) => console.error("Location update failed:", err));
            },
            (err) => console.error("Geolocation error:", err),
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );
        //clearWatchal leállítjukl a figyelést
        return () => navigator.geolocation.clearWatch(watchId);
    }, [role, isActive]);
}

export default LocationTracker;