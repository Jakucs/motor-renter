import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Kérlek töltsd ki az összes mezőt!");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    // Később ide kerül a Spring Boot API hívás
  };

  return (
    <div className="wrapper">
      <div id="formContent" className="fadeInDown">

        <h2 className="active">Bejelentkezés</h2>

        <form onSubmit={handleLogin}>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <input
            type="text"
            className="fadeIn second"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            className="fadeIn third"
            placeholder="Jelszó"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <input
            type="submit"
            className="fadeIn fourth"
            value="Belépés"
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

export default App;