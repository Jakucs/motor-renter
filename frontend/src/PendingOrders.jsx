import { useState, useEffect } from "react";
import { authFetch } from "./utils/authFetch";

function PendingOrders({ role }) {
    const [pendingOrder, setPendingOrder] = useState(null);

    useEffect(() => {
        if (role !== "DRIVER") return;

        const userId = localStorage.getItem("userId");

        const checkOrders = async () => {
            try {
                const res = await authFetch(`http://localhost:8080/api/orders/driver/${userId}/pending`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setPendingOrder(data[0]);
                    }
                }
            } catch (err) {
                console.error("Order check failed:", err);
            }
        };

        checkOrders();
        const interval = setInterval(checkOrders, 3000);
        return () => clearInterval(interval);
    }, [role]);

    if (!pendingOrder) return null;

    const handleAccept = async () => {
        await authFetch(`http://localhost:8080/api/orders/${pendingOrder.id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "ACCEPTED" })
        });
        setPendingOrder(null);
    };

    const handleReject = async () => {
        await authFetch(`http://localhost:8080/api/orders/${pendingOrder.id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "REJECTED" })
        });
        setPendingOrder(null);
    };

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "30px",
                width: "90%",
                maxWidth: "400px",
                textAlign: "center"
            }}>
                <h3>🔔 Új rendelés érkezett!</h3>
                <p style={{ color: "#555" }}>
                    <strong>{pendingOrder.passenger.firstName} {pendingOrder.passenger.lastName}</strong> fuvart rendelt.
                </p>
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button
                        onClick={handleAccept}
                        style={{
                            flex: 1, padding: "12px",
                            background: "#2e7d32", color: "white",
                            border: "none", borderRadius: "8px", cursor: "pointer"
                        }}
                    >
                        ✅ Elfogad
                    </button>
                    <button
                        onClick={handleReject}
                        style={{
                            flex: 1, padding: "12px",
                            background: "#e74c3c", color: "white",
                            border: "none", borderRadius: "8px", cursor: "pointer"
                        }}
                    >
                        ❌ Elutasít
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderNotification;