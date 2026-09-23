import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "./utils/authFetch";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = () => {
        authFetch(`http://localhost:8080/api/vehicle`)
        .then(res => res.json())
        .then(data => setVehicles(data));
    };

        const handleSetPrimary = async (vehicleId, event) => {
        event.stopPropagation();
        try {
            const response = await authFetch(`http://localhost:8080/api/vehicle/${vehicleId}/set-primary`, {
                method: "PUT"
            });
            if (response.ok) {
                loadVehicles();
            }
        } catch (err) {
            console.error("Elsődleges jármű beállítása sikertelen:", err);
        }
    };

    return (
        <div className="wrapper">
        <div id="formContent" className="fadeInDown">
            <img
            src="/moto-share.png"
            alt="logo"
            width="200"
            onClick={() => navigate("/home")}
            style={{ display: "block", margin: "20px auto 0 auto", cursor: "pointer" }}
            />

            <h2 className="active">Járműveim</h2>

            {vehicles.length === 0 ? (
            <p style={{ color: "#555", textAlign: "center", marginTop: "20px" }}>
                Még nincs hozzáadott jármű.
            </p>
            ) : (
            vehicles.map(vehicle => (
                <div
                key={vehicle.id}
                onClick={() => navigate(`/settings/vehicle/${vehicle.id}`)}
                style={{
                    padding: "12px 16px",
                    margin: "8px 10px",
                    background: "#f5f5f5",
                    borderRadius: "8px",
                    cursor: "pointer",
                    textAlign: "left",
                    border: vehicle.isPrimary ? "2px solid #91bbfa" : "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
                >
                <span>
                    🏍️ <strong>{vehicle.brand} {vehicle.model}</strong> — {vehicle.year}
                    {vehicle.isPrimary && <span style={{ color: "#91bbfa", marginLeft: "8px" }}>⭐ Elsődleges</span>}
                </span>

                {!vehicle.isPrimary && (
                    <button
                        onClick={(e) => handleSetPrimary(vehicle.id, e)}
                        style={{
                            background: "#91bbfa",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            padding: "6px 10px",
                            cursor: "pointer",
                            fontSize: "12px"
                        }}
                    >
                        Elsődlegesnek jelöl
                    </button>
                )}
                </div>
            ))
            )}

            <input
            type="button"
            className="fadeIn fourth"
            value="+ Új jármű hozzáadása"
            onClick={() => navigate("/settings/vehicle/new")}
            />

        </div>
        </div>
    );
}

export default Vehicles;