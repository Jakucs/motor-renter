import { useState } from "react";

function DriverStatus() {
    const [role, setRole] = useState("");

    const handleRoleSwitch = async () => {
        const userId = localStorage.getItem("userId");

        if (role === "DRIVER") {
            const response = await fetch(
                `http://localhost:8080/api/profile/${userId}/role`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        role: "PASSENGER"
                    })
                }
            );

            if (response.ok) {
                setRole("PASSENGER");
            }

            return;
        }

        const response = await fetch(
            `http://localhost:8080/api/profile/${userId}/role`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    role: "DRIVER"
                })
            }
        );

        if (response.ok) {
            setRole("DRIVER");
        }
    };

    return (
        <div>
            <div style={{ textAlign: "center", margin: "10px 0" }}>
                <p style={{ color: "#555", marginBottom: "8px" }}>
                    Jelenlegi státusz:{" "}
                    <strong>
                        {role === "DRIVER" ? "🏍️ Sofőr" : "🧍 Utas"}
                    </strong>
                </p>

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
            </div>
        </div>
    );
}

export default DriverStatus;