import Map from "./Map";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/Home.css";
import Menu from "./Menu";

function Home() {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="wrapper">
      <div id="formContent" className="fadeInDown" style={{ padding: "15px", textAlign: "center", position: "relative" }}>

        <div className="desktop-nav">
          <img 
            src="moto-share.png" 
            alt="logo" 
            width="120"   
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
          <div className="nav-links">
            <span onClick={() => navigate("/home")}>Főoldal</span>

            <div className="dropdown">
              <span onClick={() => setSettingsOpen(!settingsOpen)}>Beállítások ▾</span>
              {settingsOpen && (
                <div className="dropdown-menu">
                  <div onClick={() => navigate("/settings/profile")}>Személyes profil</div>
                  <div onClick={() => navigate("/settings/vehicle")}>Jármű adatok</div>
                  <div onClick={() => navigate("/settings/moto")}>Motor specifikus</div>
                  <div onClick={() => navigate("/settings/availability")}>Elérhetőség</div>
                </div>
              )}
            </div>

            <span onClick={() => navigate("/")}>Kilépés</span>
          </div>
        </div>

        <div className="mobile-nav">
          <Menu />
          <img 
            src="moto-share.png" 
            alt="logo" 
            width="200"         
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          />
        </div>

        <Map />
        <br />
        <input type="submit" className="fadeIn fourth" value="Rendelés" />

      </div>
    </div>
  );
}

export default Home;