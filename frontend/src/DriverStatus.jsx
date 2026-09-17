import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/DriverStatus.css";

function DriverStatus() {
    const [role, setRole] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const loadRole = async () => {
            const userId = localStorage.getItem("userId");

            try {
                const response = await fetch(
                    `http://localhost:8080/api/profile/${userId}`
                );

                if (response.ok) {
                    const user = await response.json();
                    setRole(user.role ?? "");
                    setIsActive(user.isActive ?? false);
                } else {
                    setError("Nem sikerült betölteni a státuszt!");
                }
            } catch (err) {
                console.error(err);
                setError("Nem sikerült kapcsolódni a szerverhez!");
            }
        };

        loadRole();
    }, []);

    //AMÍG A SOFŐR AKTÍV, ADDIG KÜLDI A USER A POZÍCIÓT
    useEffect(() => {
        if (role !== "DRIVER" || !isActive) return;

        const userId = localStorage.getItem("userId");

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                fetch(`http://localhost:8080/api/profile/${userId}/location`, {
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

        return () => navigator.geolocation.clearWatch(watchId);
    }, [role, isActive]);

    const handleRoleSwitch = async () => {
        const userId = localStorage.getItem("userId");

        if (role !== "DRIVER") {
            const userResponse = await fetch(`http://localhost:8080/api/profile/${userId}`);
            const user = await userResponse.json();

            if (!user.phoneNumber) {
                navigate("/no-phone-number");
                return;
            }

            const vehicleResponse = await fetch(`http://localhost:8080/api/vehicle/${userId}`);
            const vehicles = await vehicleResponse.json();

            if (!vehicles || vehicles.length === 0) {
                navigate("/no-vehicle");
                return;
            }
        }

        const newRole = role === "DRIVER" ? "PASSENGER" : "DRIVER";

        try {
            const response = await fetch(
                `http://localhost:8080/api/profile/${userId}/role`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role: newRole })
                }
            );

            if (response.ok) {
                setRole(newRole);
            } else {
                setError("Nem sikerült módosítani a státuszt!");
            }
        } catch (err) {
            console.error(err);
            setError("Nem sikerült kapcsolódni a szerverhez!");
        }
    };

        const handleActiveToggle = async () => {
            const userId = localStorage.getItem("userId");
            const newActive = !isActive;

            try {
                const response = await fetch(
                    `http://localhost:8080/api/profile/${userId}/active`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ isActive: newActive }) // isActive helyett active
                    }
                );

                if (response.ok) {
                    setIsActive(newActive);
                } else {
                    setError("Nem sikerült módosítani az elérhetőséget!");
                }
            } catch (err) {
                console.error(err);
                setError("Nem sikerült kapcsolódni a szerverhez!");
            }
        };

    return (
        <div>
            <div style={{ textAlign: "center", margin: "10px 0" }}>

                <img
                    src="/moto-share.png"
                    alt="logo"
                    width="200"
                    onClick={() => navigate("/home")}
                    style={{ display: "block", margin: "20px auto 0 auto", cursor: "pointer" }}
                />

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <p style={{ color: "#555", marginBottom: "8px" }}>
                    Jelenlegi státusz:{" "}
                    <strong>
                        {role === "DRIVER"
                            ? "🏍️ Sofőr"
                            : "🧍 Utas"}
                    </strong>
                    {role === "DRIVER" && (
                        <>
                            {" — "}
                            <strong>{isActive ? "🟢 Aktív" : "⚪ Inaktív"}</strong>
                        </>
                    )}
                </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
                <input
                    type="button"
                    className="fadeIn fourth"
                    value={
                        role === "DRIVER"
                            ? "Váltás: Utas"
                            : "Váltás: Sofőr"
                    }
                    onClick={handleRoleSwitch}
                />

                {role === "DRIVER" && (
                    <input
                        type="button"
                        className={`fadeIn fourth ${isActive ? "active-toggle-on" : "active-toggle-off"}`}
                        value={isActive ? "🟢 Elérhető vagyok" : "⚪ Nem vagyok elérhető"}
                        onClick={handleActiveToggle}
                    />
                )}
            </div>
            </div>
        </div>
    );
}

export default DriverStatus;