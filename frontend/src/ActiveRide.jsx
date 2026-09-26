import { useState } from "react";
import { authFetch } from "./utils/authFetch";

function ActiveRide({ order, onComplete }) {

    const [status, setStatus] = useState(order.status);

    const handleStatusUpdate = async (newStatus) => {
        const res = await authFetch(`http://localhost:8080/api/orders/${order.id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });

        if (res.ok) {
            setStatus(newStatus);
            if (newStatus === "COMPLETED") {
                onComplete();
            }
        }
    };

    const openNavigation = () => {
        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${order.passengerLat},${order.passengerLng}`,
            "_blank"
        );
    };

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "white",
            zIndex: 3000,
            overflowY: "auto",
            padding: "30px 20px"
        }}>
            <h2 style={{ textAlign: "center" }}>🏍️ Aktív fuvar</h2>

            {/* Utas adatai */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img
                    src={order.passenger.profilePictureUrl
                        ? `http://localhost:8080${order.passenger.profilePictureUrl}`
                        : "/default-avatar.png"}
                    alt="profil"
                    style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
                />
                <h3>{order.passenger.firstName} {order.passenger.lastName}</h3>
                <p style={{ color: "#555" }}>📞 {order.passenger.phoneNumber}</p>
                <div style={{ fontSize: "14px", color: "#555" }}>
                    {order.passenger.hasHelmet ? "✅ Van bukósisakja" : "❌ Nincs bukósisakja"}
                    <br />
                    {order.passenger.hasProtectiveGear ? "✅ Van protektoros ruhája" : "❌ Nincs protektoros ruhája"}
                </div>
            </div>

            {/* Navigáció */}
            <button
                onClick={openNavigation}
                style={{
                    width: "100%", padding: "14px",
                    background: "#4285F4", color: "white",
                    border: "none", borderRadius: "10px",
                    cursor: "pointer", fontSize: "16px",
                    marginBottom: "10px"
                }}
            >
                🗺️ Navigáció az utashoz
            </button>

            {/* Státusz gombok */}
            {status === "ACCEPTED" && (
                <button
                    onClick={() => handleStatusUpdate("IN_PROGRESS")}
                    style={{
                        width: "100%", padding: "14px",
                        background: "#f57f17", color: "white",
                        border: "none", borderRadius: "10px",
                        cursor: "pointer", fontSize: "16px",
                        marginBottom: "10px"
                    }}
                >
                    🧍 Felvette az utast
                </button>
            )}

            {status === "IN_PROGRESS" && (
                <button
                    onClick={() => handleStatusUpdate("COMPLETED")}
                    style={{
                        width: "100%", padding: "14px",
                        background: "#2e7d32", color: "white",
                        border: "none", borderRadius: "10px",
                        cursor: "pointer", fontSize: "16px",
                        marginBottom: "10px"
                    }}
                >
                    ✅ Fuvar befejezve
                </button>
            )}
        </div>
    );
}

export default ActiveRide;