import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (!username || !email || !firstname || !lastname || !password || !confirmPassword) {
      setError("Kérlek töltsd ki az összes mezőt!");
      return;
    }

    if (password !== confirmPassword) {
      setError("A két jelszó nem egyezik!");
      return;
    }

    console.log("Register:", { username, email, firstname, lastname, password });
    // Később ide kerül a Spring Boot API hívás

    const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({  userName: username,
                                firstName: firstname,
                                lastName: lastname,
                                email: email,
                                password: password
                              })
    });

        if (response.ok) {
            navigate("/");  // sikeres regisztráció → login oldalra
        } else {
            setError("Sikertelen regisztráció!");
        }
  };

  return (
    <div className="wrapper">
      <div id="formContent" className="fadeInDown">
        <img src="moto-share.png" alt="logo" width="200" style={{ display: "block", margin: "20px auto 0 auto" }} />
        <h2 className="active">Regisztráció</h2>

        <form onSubmit={handleRegister}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

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
            type="password"
            className="fadeIn third"
            placeholder="Jelszó"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="fadeIn third"
            placeholder="Jelszó megerősítése"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <input
            type="submit"
            className="fadeIn fourth"
            value="Regisztráció"
          />
        </form>

        <div id="formFooter">
          <a className="underlineHover" href="#">
            Elfelejtetted a jelszavad?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;