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

  const validate = () => {
    const nameRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9\s\-]{2,50}$/;
    const yearRegex = /^(19[0-9]{2}|20[0-2][0-9])$/;
    const engineRegex = /^[0-9]{2,4}$/;

    if (!nameRegex.test(brand)) {
        setError("Érvénytelen márka!");
        return false;
    }
    if (!nameRegex.test(model)) {
        setError("Érvénytelen modell!");
        return false;
    }
    if (!yearRegex.test(year)) {
        setError("Érvénytelen évjárat! (1900-2026)");
        return false;
    }
    if (!engineRegex.test(engineSize)) {
        setError("Érvénytelen hengerűrtartalom! (pl. 125, 650, 1000)");
        return false;
    }
    return true;
};

    useEffect(() => {
        if (!id) return;

        authFetch(`http://localhost:8080/api/vehicle/single/${id}`)
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

        if (!validate()) return;

        const url = id
            ? `http://localhost:8080/api/vehicle/${id}`
            : `http://localhost:8080/api/vehicle`;

        const method = id ? "PUT" : "POST";

        try {
            const response = await authFetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ brand, model, year: parseInt(year), engineSize: parseInt(engineSize) })
            });

            if (!response.ok) {
                setError(`Sikertelen mentés! (${response.status})`);
                return;
            }

            const savedVehicle = await response.json();

            if (selectedFile) {
                try {
                    const formData = new FormData();
                    formData.append("file", selectedFile);

                    const uploadRes = await authFetch(`http://localhost:8080/api/vehicle/${savedVehicle.id}/upload-picture`, {
                        method: "POST",
                        body: formData
                    });

                    if (!uploadRes.ok) {
                        setError(`A jármű elmentve, de a kép feltöltése sikertelen (${uploadRes.status}).`);
                        return;
                    }
                } catch (uploadErr) {
                    console.error("Kép feltöltési hiba:", uploadErr);
                    setError("A jármű elmentve, de a kép feltöltése közben hálózati hiba történt.");
                    return;
                }
            }

            navigate("/successful-save");
        } catch (err) {
            console.error("Mentési hiba:", err);
            setError("Nem sikerült kapcsolódni a szerverhez. Ellenőrizd, hogy fut-e a backend.");
        }
    };

            //LEKICSINYÍTJÜK A KÉPET
            const compressImage = (file, maxSizeBytes = 2 * 1024 * 1024) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = new Image();
                        img.onload = () => {
                            let quality = 0.7;
                            let maxDim = 800;

                            const tryCompress = () => {
                                const canvas = document.createElement("canvas");
                                let width = img.width;
                                let height = img.height;

                                if (width > height && width > maxDim) {
                                    height = (height * maxDim) / width;
                                    width = maxDim;
                                } else if (height > maxDim) {
                                    width = (width * maxDim) / height;
                                    height = maxDim;
                                }

                                canvas.width = width;
                                canvas.height = height;
                                const ctx = canvas.getContext("2d");
                                ctx.drawImage(img, 0, 0, width, height);

                                canvas.toBlob((blob) => {
                                    if (blob.size > maxSizeBytes && quality > 0.3) {
                                        // ha még mindig túl nagy, csökkentjük a minőséget és/vagy méretet
                                        quality -= 0.1;
                                        maxDim = Math.max(300, maxDim - 100);
                                        tryCompress();
                                    } else {
                                        resolve(new File([blob], file.name, { type: "image/jpeg" }));
                                    }
                                }, "image/jpeg", quality);
                            };

                            tryCompress();
                        };
                        img.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                });
            };

        const handleFileChange = async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const compressed = await compressImage(file);
            const maxSizeBytes = 5 * 1024 * 1024; //5mb bizt. tartalék a backend 10mb-hoz képest
            if (compressed.size > maxSizeBytes) {
                setError("A kép mérete a tömörítés után is túl nagy. Próbálj kisebb felbontású képet feltölteni.");
                return;
            }
            setSelectedFile(compressed);

            if (!id) {
                setError("Előbb mentsd el a jármű adatait, majd töltsd fel a képet!");
                return;
            }

            try {
                const formData = new FormData();
                formData.append("file", compressed);

                const response = await authFetch(`http://localhost:8080/api/vehicle/${id}/upload-picture`, {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    const updatedVehicle = await response.json();
                    setVehiclePicture(updatedVehicle.pictureUrl);
                    setUploadSuccess(true);
                } else {
                    setError(`Sikertelen képfeltöltés! (${response.status})`);
                }
            } catch (err) {
                console.error("Képfeltöltési hiba:", err);
                setError("Nem sikerült kapcsolódni a szerverhez a kép feltöltésekor.");
            }
        };

    const handleDelete = async () => {
        if (!window.confirm("Biztosan törölni szeretnéd ezt a járművet?")) return;

        try {
            const response = await authFetch(`http://localhost:8080/api/vehicle/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                navigate("/settings/vehicle");
            } else {
                setError(`Sikertelen törlés! (${response.status})`);
            }
        } catch (err) {
            console.error("Törlési hiba:", err);
            setError("Nem sikerült kapcsolódni a szerverhez a törlés során.");
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

          {id && (
              <input
                  type="button"
                  className="fadeIn fourth"
                  value="🗑️ Jármű törlése"
                  onClick={handleDelete}
                  style={{ backgroundColor: "#e74c3c", boxShadow: "0 10px 30px 0 rgba(231,76,60,0.4)" }}
              />
          )}
          
        </form>
      </div>
    </div>
  );
}

export default VehicleData;