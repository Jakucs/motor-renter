import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "./utils/authFetch";

function PersonalProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
      authFetch(`http://localhost:8080/api/profile`)
        .then(res => res.json())
        .then(user => {
          setUsername(user.userName ?? "");
          setEmail(user.email);
          setFirstname(user.firstName);
          setLastname(user.lastName);
          setPhone(user.phoneNumber ?? "");
          setProfilePicture(user.profilePictureUrl ?? "");
        })
        .catch(err => console.log("error:", err));
  }, []);

  const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setSelectedFile(file);

      const formData = new FormData();
      formData.append("file", file);

      try {
          const response = await authFetch(`http://localhost:8080/api/profile/upload-picture`, {
              method: "POST",
              body: formData
          });

          if (response.ok) {
              const updatedUser = await response.json();
              setProfilePicture(updatedUser.profilePictureUrl);
              setUploadSuccess(true);
          } else {
              setError("Sikertelen képfeltöltés!");
          }
      } catch (err) {
          setError("Hiba történt a feltöltés során!");
      }
  };
  

  const handleSave = async (event) => {
      event.preventDefault();
      setError("");

      const phoneRegex = /^(\+36|06)[0-9]{9}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!phone || !phoneRegex.test(phone)) {
          setError("Érvénytelen telefonszám! (pl. +36301234567 vagy 06301234567)");
          return;
      }

      if (!email || !emailRegex.test(email)) {
          setError("Érvénytelen email cím!");
          return;
      }

      try {
          const phoneRes = await authFetch(`http://localhost:8080/api/profile`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ phoneNumber: phone })
          });

          const emailRes = await authFetch(`http://localhost:8080/api/profile/email`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email })
          });

          if (phoneRes.ok && emailRes.ok) {
              navigate("/successful-save");
          } else if (!emailRes.ok) {
              const errText = await emailRes.text();
              setError(errText || "Sikertelen email mentés!");
          } else if (!phoneRes.ok) {
            const errText = await phoneRes.text();
            setError(errText || "Sikertelen telefonszám mentés!");
        }
      } catch (err) {
          setError("Hiba történt a mentés során!");
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
        
        <h2 className="active">Személyes profil</h2>

        <form onSubmit={handleSave}>
          {error && <div className="error-message">{error}</div>}
          
        <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "10px auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", margin: "10px auto" }}>
            
            {profilePicture && (
                <img
                    src={`http://localhost:8080${profilePicture}`}
                    alt="Profilkép"
                    style={{ 
                        width: "120px", 
                        height: "120px", 
                        borderRadius: "50%", 
                        objectFit: "cover",
                        border: "3px solid #91bbfa",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}
                />
            )}

            <label htmlFor="fileInput" style={{
                padding: "8px 16px",
                background: "#91bbfa",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
                whiteSpace: "nowrap"
            }}>
                {selectedFile ? `📷 ${selectedFile.name}` : profilePicture ? "📷 Profilkép módosítása" : "📷 Profilkép feltöltése"}
            </label>

        </div>
  </div>

    <div>
          {uploadSuccess && (
            <div style={{ color: "green", fontSize: "14px", textAlign: "center" }}>
                ✅ Képfeltöltés sikeres!
            </div>
        )}
    </div>
    <br />

{/*           <input
              type="button"
              className="fadeIn fourth"
              value="Jármű beállítások →"
              onClick={() => navigate("/settings/vehicle")}
          /> */}

          <input
            type="text"
            className="fadeIn second"
            placeholder="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            readOnly
          />

          <input
            type="text"
            className="fadeIn second"
            placeholder="Email cím"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            className="fadeIn third"
            placeholder="Vezetéknév"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            readOnly
          />

          <input
            type="text"
            className="fadeIn third"
            placeholder="Keresztnév"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            readOnly
          />

          <input
            type="text"
            className="fadeIn third"
            placeholder="Telefonszám"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="button"
            className="fadeIn fourth"
            value="Jelszó módosítása"
            onClick={() => navigate("/settings/change-password")}
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

export default PersonalProfile;