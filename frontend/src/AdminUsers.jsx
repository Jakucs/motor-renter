import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "./utils/authFetch"; // igazítsd az útvonalat

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        authFetch("http://localhost:8080/api/admin/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => {
                console.error(err);
                setError("Nem sikerült betölteni a felhasználókat!");
            });
    };

    const handleDelete = async (userId, userName) => {
        if (!window.confirm(`Biztosan törölni szeretnéd ezt a felhasználót: ${userName}? Ez a művelet nem vonható vissza!`)) return;

        try {
            const response = await authFetch(`http://localhost:8080/api/admin/users/${userId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setUsers(users.filter(u => u.id !== userId));
            } else {
                setError("Sikertelen törlés!");
            }
        } catch (err) {
            console.error(err);
            setError("Hiba történt a törlés során!");
        }
    };

    return (
        <div className="wrapper">
            <div id="formContent" className="fadeInDown" style={{ maxWidth: "900px" }}>
                <img
                    src="/moto-share.png"
                    alt="logo"
                    width="200"
                    onClick={() => navigate("/home")}
                    style={{ display: "block", margin: "20px auto 0 auto", cursor: "pointer" }}
                />
                <h2 className="active">Admin — Felhasználók</h2>

                {error && <div className="error-message">{error}</div>}

                <div style={{ overflowX: "auto", margin: "20px 10px" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid #91bbfa" }}>
                                <th style={{ padding: "8px" }}>ID</th>
                                <th style={{ padding: "8px" }}>Felhasználónév</th>
                                <th style={{ padding: "8px" }}>Email</th>
                                <th style={{ padding: "8px" }}>Név</th>
                                <th style={{ padding: "8px" }}>Szerepkör</th>
                                <th style={{ padding: "8px" }}>Aktív</th>
                                <th style={{ padding: "8px" }}>Művelet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "8px" }}>{user.id}</td>
                                    <td style={{ padding: "8px" }}>{user.userName}</td>
                                    <td style={{ padding: "8px" }}>{user.email}</td>
                                    <td style={{ padding: "8px" }}>{user.firstName} {user.lastName}</td>
                                    <td style={{ padding: "8px" }}>{user.role}</td>
                                    <td style={{ padding: "8px" }}>{user.isActive ? "🟢" : "⚪"}</td>
                                    <td style={{ padding: "8px" }}>
                                        <button
                                            onClick={() => handleDelete(user.id, user.userName)}
                                            style={{
                                                background: "#e74c3c",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                padding: "6px 12px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            🗑️ Törlés
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminUsers;