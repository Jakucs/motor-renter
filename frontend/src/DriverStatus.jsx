import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "./utils/authFetch";
import "./css/DriverStatus.css";

function DriverStatus() {
    const [role, setRole] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const loadRole = async () => {
            try {
                const response = await authFetch(
                    `http://localhost:8080/api/profile`
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

    const handleRoleSwitch = async () => {
        if (role !== "DRIVER") {
            const userResponse = await authFetch(`http://localhost:8080/api/profile`);
            const user = await userResponse.json();

            if (!user.phoneNumber) {
                navigate("/no-phone-number");
                return;
            }

            const vehicleResponse = await authFetch(`http://localhost:8080/api/vehicle`);
            const vehicles = await vehicleResponse.json();

            if (!vehicles || vehicles.length === 0) {
                navigate("/no-vehicle");
                return;
            }
        }

        const newRole = role === "DRIVER" ? "PASSENGER" : "DRIVER";

        try {
            const response = await authFetch(
                `http://localhost:8080/api/profile/role`,
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
        const newActive = !isActive;

        try {
            const response = await authFetch(
                `http://localhost:8080/api/profile/${localStorage.getItem("userId")}/active`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ isActive: newActive }) //isActive helyett active lenne a basic
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