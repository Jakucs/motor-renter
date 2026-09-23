import { useState, useEffect } from "react";
import { authFetch } from "./utils/authFetch";

function ActiveDriversList({ onClose, onSelect }) {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        authFetch("http://localhost:8080/api/drivers/active")
            .then(res => res.json())
            .then(data => setDrivers(data));
    }, []);

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-end"
        }}>
            <div style={{
                background: "white",
                width: "100%",
                borderRadius: "20px 20px 0 0",
                padding: "20px",
                maxHeight: "70vh",
                overflowY: "auto"
            }}>
                <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Elérhető sofőrök a közelben</h3>

                {drivers.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#555" }}>Nincs elérhető sofőr a közelben.</p>
                ) : (
                    drivers.map(driver => (
                        <div
                            key={driver.userId}
                            onClick={() => onSelect(driver)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "1px solid #ddd",
                                marginBottom: "10px",
                                cursor: "pointer"
                            }}
                        >
                            <img
                                src={driver.profilePictureUrl ? `http://localhost:8080${driver.profilePictureUrl}` : "/default-avatar.png"}
                                alt="profil"
                                style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
                            />
                            <div>
                                <strong>{driver.firstName} {driver.lastName}</strong>
                                <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
                                    🏍️ {driver.vehicleBrand} {driver.vehicleModel}
                                </p>
                            </div>
                        </div>
                    ))
                )}

                <button
                    onClick={onClose}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#e74c3c",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "10px"
                    }}
                >
                    Mégsem
                </button>
            </div>
        </div>
    );
}

export default ActiveDriversList;