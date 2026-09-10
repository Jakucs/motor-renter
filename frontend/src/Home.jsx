import Map from "./Map";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";
import Menu from "./Menu";

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="wrapper">
      <div id="formContent" className="fadeInDown" style={{ padding: "15px", textAlign: "center", position: "relative" }}>


      <div className="desktop-nav">
        <img 
        src="moto-share.png" 
        alt="logo" 
        width="120"   
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}/>
        <div className="nav-links">
          <span onClick={() => navigate("/home")}>Főoldal</span>
          <span onClick={() => navigate("/settings")}>Beállítások</span>
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
        style={{ cursor: "pointer" }}/>
      </div>

        <Map />
        <br />
        <input type="submit" className="fadeIn fourth" value="Rendelés" />

      </div>
    </div>
  );
}

export default Home;