import { useEffect, useState } from "react";

function DriverStatus() {
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

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
        const userId = localStorage.getItem("userId");

        const newRole = role === "DRIVER"
            ? "PASSENGER"
            : "DRIVER";

        try {
            const response = await fetch(
                `http://localhost:8080/api/profile/${userId}/role`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        role: newRole
                    })
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

    return (
        <div>
            <div style={{ textAlign: "center", margin: "10px 0" }}>

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