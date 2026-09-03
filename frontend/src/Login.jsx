import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react"; 

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Kérlek töltsd ki az összes mezőt!");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    // Spring Boot API hívás:
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        console.log("Cooool")
        navigate("/home");
      } else {
        setError("Hibás email vagy jelszó!");
      }
  };

  return (
    <div className="wrapper">
      <div id="formContent" className="fadeInDown">
      <img src="moto-share.png" alt="logo" width="200" style={{ display: "block", margin: "20px auto 0 auto" }} />
        <h2 className="active" style={{ marginTop: "5px" }}>Bejelentkezés</h2>

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

            <div className="text-center fadeIn fifth underlineHover">
            Nincs még fiókod? 
            <span onClick={() => navigate("/register")} style={{ color: "#91bbfa", cursor: "pointer" }}>
                Regisztrálj
            </span>
            </div>

        <div id="formFooter">
          <a className="underlineHover" href="#">
            Elfelejtetted a jelszavad?
          </a>
        </div>

      </div>
    </div>

  );
}

  export default Login;