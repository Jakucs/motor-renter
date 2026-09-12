import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VehicleData() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");

    if (!brand || !model || !year || !engineSize) {
      setError("Kérlek töltsd ki az összes mezőt!");
      return;
    }

    const userId = localStorage.getItem("userId");

    const response = await fetch(`http://localhost:8080/api/vehicle/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, model, year: parseInt(year), engineSize: parseInt(engineSize) })
    });

    if (response.ok) {
      navigate("/successful-save");
    } else {
      setError("Sikertelen mentés!");
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
        <h2 className="active">Jármű adatok</h2>

        <form onSubmit={handleSave}>
          {error && <div className="error-message">{error}</div>}

          <input
            type="text"
            className="fadeIn second"
            placeholder="Márka"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <input
            type="text"
            className="fadeIn second"
            placeholder="Modell"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />

          <input
            type="number"
            className="fadeIn third"
            placeholder="Évjárat"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <input
            type="number"
            className="fadeIn third"
            placeholder="Hengerűrtartalom (cm³)"
            value={engineSize}
            onChange={(e) => setEngineSize(e.target.value)}
          />

          <input
            type="submit"
            className="fadeIn fourth"
            value="Mentés"
          />
        </form>
      </div>
    </div>
  );
}

export default VehicleData;