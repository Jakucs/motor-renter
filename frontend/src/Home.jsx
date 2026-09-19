import Map from "./Map";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/Home.css";
import Menu from "./Menu";

function Home() {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      navigate("/");
  };

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
                  <div onClick={() => navigate("/settings/profile")}>Személyes adatok</div>
                  <div onClick={() => navigate("/settings/vehicle")}>Jármű adatok</div>
                  <div onClick={() => navigate("/settings/riding-gear")}>Ruházat</div>
                  <div onClick={() => navigate("/settings/driver-status")}>Sofőr státusz</div>

                </div>
              )}
            </div>

            <span onClick={() => navigate("/about")}>Elérhetőség</span>
            <span onClick={handleLogout}>Kilépés</span>
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