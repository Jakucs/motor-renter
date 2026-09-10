import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PersonalProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");

    if (!username || !email || !firstname || !lastname || !phone) {
      setError("Kérlek töltsd ki az összes mezőt!");
      return;
    }

    const response = await fetch("http://localhost:8080/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: username, firstName: firstname, lastName: lastname, email: email, phone: phone })
    });

    if (response.ok) {
      navigate("/home");
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
            type="text"
            className="fadeIn second"
            placeholder="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />

          <input
            type="text"
            className="fadeIn third"
            placeholder="Keresztnév"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
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