import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "./utils/authFetch"; // igazítsd az útvonalat

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    const passwordRegex = /^.{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setError("Az új jelszó legalább 8 karakter legyen!");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("A két új jelszó nem egyezik!");
      return false;
    }
    return true;
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Kérlek töltsd ki az összes mezőt!");
      return;
    }

    if (!validate()) return;

    try {
      const response = await authFetch("http://localhost:8080/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (response.ok) {
        navigate("/successful-save");
      } else {
        const message = await response.text();
        setError(message || "Sikertelen jelszóváltoztatás!");
      }
    } catch (err) {
      console.error("Jelszóváltoztatási hiba:", err);
      setError("Nem sikerült kapcsolódni a szerverhez!");
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
        <h2 className="active">Jelszó módosítása</h2>

        <form onSubmit={handleSave}>
          {error && <div className="error-message">{error}</div>}

          <input
            type="password"
            className="fadeIn second"
            placeholder="Jelenlegi jelszó"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            className="fadeIn third"
            placeholder="Új jelszó"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            className="fadeIn third"
            placeholder="Új jelszó megerősítése"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePassword;