import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:8080/api/vehicle/${userId}`)
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, []);

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

        <input
          type="button"
          className="fadeIn fourth"
          value="+ Új jármű hozzáadása"
          onClick={() => navigate("/settings/vehicle/new")}
        />

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
                border: "1px solid #ddd"
              }}
            >
              🏍️ <strong>{vehicle.brand} {vehicle.model}</strong> — {vehicle.year}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Vehicles;