import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const userId = localStorage.getItem("userId");
    console.log("userId:", userId);

    fetch(`http://localhost:8080/api/profile/${userId}`)
      .then(res => res.json())
      .then(user => {
        setUsername(user.userName ?? "");
        setEmail(user.email);
        setFirstname(user.firstName);
        setLastname(user.lastName);
        setPhone(user.phoneNumber ?? "");
        //setProfilePicture(user.profilePicture ?? "");
      })
      .catch(err => console.log("error:", err));
      ;
  }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);

        const userId = localStorage.getItem("userId");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`http://localhost:8080/api/profile/${userId}/upload-picture`, {
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

/*       const handleUpload = async () => {
      if (!selectedFile) {
        setError("Válassz ki egy képet!");
        return;
      }

      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(`http://localhost:8080/api/profile/${userId}/upload-picture`, {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setProfilePicture(updatedUser.profilePictureUrl);
        } else {
          setError("Sikertelen képfeltöltés!");
        }
      } catch (err) {
        setError("Hiba történt a feltöltés során!");
      }
    }; */
  

  const handleSave = async (event) => {
      event.preventDefault();
      setError("");

      const phoneRegex = /^(\+36|06)[0-9]{9}$/;

      if (!phone || !phoneRegex.test(phone)) {
          setError("Érvénytelen telefonszám! (pl. +36301234567 vagy 06301234567)");
          return;
      }

      const userId = localStorage.getItem("userId");

      const response = await fetch(`http://localhost:8080/api/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone })
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
        <img src="moto-share.png" alt="logo" width="200" style={{ display: "block", margin: "20px auto 0 auto" }} />
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
        <label htmlFor="fileInput" style={{
            padding: "8px 16px",
            background: "#91bbfa",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            whiteSpace: "nowrap"
        }}>
            {selectedFile ? `📷 ${selectedFile.name}` : "📷 Profilkép feltöltése"}
        </label>

      {/*     {!profilePicture && (
              <span style={{ color: "#555", fontSize: "14px" }}>
                  Tölts fel profilképet!
              </span>
          )} */}

    {profilePicture && (
        <img
            src={`http://localhost:8080${profilePicture}`}
            alt="Profilkép"
            style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
        />
    )}
  </div>

    <div>
          {uploadSuccess && (
            <div style={{ color: "green", fontSize: "14px", textAlign: "center" }}>
                ✅ Képfeltöltés sikeres!
            </div>
        )}
    </div>
    <br />

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
            readOnly
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