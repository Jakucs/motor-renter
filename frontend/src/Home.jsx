import Map from "./Map";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="wrapper">
      <div id="formContent" className="fadeInDown" style={{ padding: "40px", textAlign: "center", position: "relative" }}>

        <div className="home-header">
          <img src="moto-share.png" alt="logo" width="200" />
          <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => navigate("/")}>
              Kilépés
            </div>
          </div>
        )}

        <Map />
        <br />
        <input type="submit" className="fadeIn fourth" value="Rendelés" />

      </div>
    </div>
  );
}

export default Home;