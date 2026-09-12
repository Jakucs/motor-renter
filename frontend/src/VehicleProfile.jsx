import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VehicleData() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [error, setError] = useState("");
  const [vehiclePicture, setVehiclePicture] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

    useEffect(() => {
    if (!id) return; // új jármű, nem tölt be semmit

    fetch(`http://localhost:8080/api/vehicle/single/${id}`)
      .then(res => res.json())
      .then(vehicle => {
        setBrand(vehicle.brand ?? "");
        setModel(vehicle.model ?? "");
        setYear(vehicle.year ?? "");
        setEngineSize(vehicle.engineSize ?? "");
        setVehiclePicture(vehicle.pictureUrl ?? null);
      });
  }, [id]);

  const handleSave = async (event) => {
      event.preventDefault();
      setError("");

      if (!brand || !model || !year || !engineSize) {
        setError("Kérlek töltsd ki az összes mezőt!");
        return;
      }

      const userId = localStorage.getItem("userId");

      const url = id
        ? `http://localhost:8080/api/vehicle/${id}`
        : `http://localhost:8080/api/vehicle/${userId}`;

      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, model, year: parseInt(year), engineSize: parseInt(engineSize) })
      });

      if (response.ok) {
        navigate("/successful-save");
      } else {
        setError("Sikertelen mentés!");
      }
    };

    const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    if (!id) {
        setError("Előbb mentsd el a jármű adatait, majd töltsd fel a képet!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`http://localhost:8080/api/vehicle/${id}/upload-picture`, {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const updatedVehicle = await response.json();
        setVehiclePicture(updatedVehicle.pictureUrl);
        setUploadSuccess(true);
    } else {
        setError("Sikertelen képfeltöltés!");
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
              type="file"
              accept="image/*"
              id="vehicleFileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
          />

  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", margin: "10px auto" }}>
      {vehiclePicture && (
          <img
              src={`http://localhost:8080${vehiclePicture}`}
              alt="Jármű kép"
              style={{ 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "10px", 
                  objectFit: "cover",
                  border: "3px solid #91bbfa",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}
          />
      )}

      <label htmlFor="vehicleFileInput" style={{
          padding: "8px 16px",
          background: "#91bbfa",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          whiteSpace: "nowrap"
      }}>
          {selectedFile ? `📷 ${selectedFile.name}` : vehiclePicture ? "📷 Kép módosítása" : "📷 Kép feltöltése"}
      </label>

      {uploadSuccess && (
          <div style={{ color: "green", fontSize: "14px" }}>
              ✅ Képfeltöltés sikeres!
          </div>
      )}
  </div>

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