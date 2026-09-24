import Map from "./Map";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/Home.css";
import Menu from "./Menu";
import ActiveDriversList from "./ActiveDriverList";
import { authFetch } from "./utils/authFetch";

function Home() {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showDrivers, setShowDrivers] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      navigate("/");
  };

  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
        const res = await authFetch(`http://localhost:8080/api/orders/${orderId}`);
        const order = await res.json();
        setOrderStatus(order.status);

        if (order.status === "ACCEPTED" || order.status === "REJECTED") {
            clearInterval(interval);
        }
    }, 3000);

    return () => clearInterval(interval);
}, [orderId]);

  return (
    <div className="wrapper">
      <div id="formContent" className="fadeInDown" style={{ padding: "15px", textAlign: "center", position: "relative" }}>

        <div className="desktop-nav">
          <img 
            src="moto-share.png" 
            alt="logo" 
            width="120"   
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
          <div className="nav-links">
            <span onClick={() => navigate("/home")}>Főoldal</span>

            <div className="dropdown">
              <span onClick={() => setSettingsOpen(!settingsOpen)}>Beállítások ▾</span>
              {settingsOpen && (
                <div className="dropdown-menu">
                  <div onClick={() => navigate("/settings/profile")}>Személyes adatok</div>
                  <div onClick={() => navigate("/settings/vehicle")}>Jármű adatok</div>
                  <div onClick={() => navigate("/settings/riding-gear")}>Ruházat</div>
                  <div onClick={() => navigate("/settings/driver-status")}>Sofőr státusz</div>
                  {localStorage.getItem("role") === "ADMIN" && (
                      <span onClick={() => navigate("/admin/users")}>Admin</span>
                  )}

                </div>
              )}
            </div>

            <span onClick={() => navigate("/about")}>Elérhetőség</span>
            <span onClick={handleLogout}>Kilépés</span>
          </div>
        </div>

        <div className="mobile-nav">
          <Menu />
          <img 
            src="moto-share.png" 
            alt="logo" 
            width="200"         
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <Map />
        <br />

        {orderSent && (
            <div style={{
                background: "#e8f5e9",
                color: "#2e7d32",
                padding: "12px",
                borderRadius: "8px",
                textAlign: "center",
                margin: "10px"
            }}>
                ✅ Rendelés elküldve! Kérlek várj.
            </div>
        )}

        {orderSent && (
              <div style={{
                  background: orderStatus === "ACCEPTED" ? "#e8f5e9" : orderStatus === "REJECTED" ? "#ffebee" : "#fff8e1",
                  color: orderStatus === "ACCEPTED" ? "#2e7d32" : orderStatus === "REJECTED" ? "#c62828" : "#f57f17",
                  padding: "12px",
                  borderRadius: "8px",
                  textAlign: "center",
                  margin: "10px"
              }}>
                  {orderStatus === "ACCEPTED" && "✅ A sofőr elfogadta a rendelést! Hamarosan megérkezik."}
                  {orderStatus === "REJECTED" && "❌ A sofőr elutasította a rendelést. Kérlek próbálj másikat."}
                  {!orderStatus || orderStatus === "PENDING" && "⏳ Rendelés elküldve! Kérlek várj."}
              </div>
          )}
            <input 
                type="button" 
                className="fadeIn fourth" 
                value="Rendelés" 
                onClick={() => setShowDrivers(true)}
            />


          {showDrivers && (
              <ActiveDriversList
                  onClose={() => setShowDrivers(false)}
                  onSelect={async (driver) => {
                      const passengerId = localStorage.getItem("userId");
                      
                      const res = await authFetch("http://localhost:8080/api/orders", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                              passengerId: parseInt(passengerId),
                              driverId: driver.userId
                          })
                      });
                      const order = await res.json();
                      setOrderId(order.id);
                      setOrderSent(true);
                      setShowDrivers(false);
                  }}
              />
          )}

      </div>
    </div>
  );
}

export default Home;