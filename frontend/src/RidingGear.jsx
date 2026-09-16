import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import "./css/RidingGear.css";

function RidingGear() {
  const [hasHelmet, setHasHelmet] = useState(false);
  const [hasProtectiveGear, setHasProtectiveGear] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:8080/api/profile/${userId}`)
      .then(res => res.json())
      .then(user => {
        setHasHelmet(user.hasHelmet ?? false);
        setHasProtectiveGear(user.hasProtectiveGear ?? false);
      })
      .catch(err => console.log("error:", err));
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");

    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:8080/api/profile/${userId}/riding-gear`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hasHelmet, hasProtectiveGear })
      });

      if (response.ok) {
        navigate("/successful-save");
      } else {
        setError("Sikertelen mentés!");
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
          style={{ display: "block", margin: "20px auto 0 auto", cursor: "pointer" }}
          onClick={() => navigate("/home")}
        />
        <h2 className="active">Felszerelés</h2>

        <form onSubmit={handleSave}>
          {error && <div className="error-message">{error}</div>}

            <label className="gear-item">
            <span>2 bukósisak</span>
            <input
                type="checkbox"
                checked={hasHelmet}
                onChange={(e) => setHasHelmet(e.target.checked)}
                className="gear-checkbox"
            />
            </label>

            <label className="gear-item">
            <span>Protektoros ruha</span>
            <input
                type="checkbox"
                checked={hasProtectiveGear}
                onChange={(e) => setHasProtectiveGear(e.target.checked)}
                className="gear-checkbox"
            />
            </label>
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

export default RidingGear;