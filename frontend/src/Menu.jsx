import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 80) {
      setMenuOpen(false);
      setSettingsOpen(false);
    }
  };

  return (
    <>
      <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {menuOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => { setMenuOpen(false); setSettingsOpen(false); }} />
          <div
            className="sidebar"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {!settingsOpen ? (
              <>
                <div className="sidebar-item" onClick={() => navigate("/home")}>Főoldal</div>
                <div className="sidebar-item" onClick={() => setSettingsOpen(true)}>Beállítások</div>
                <div className="sidebar-item" onClick={() => navigate("/")}>Kilépés</div>
              </>
            ) : (
              <>
                <div className="sidebar-item" onClick={() => setSettingsOpen(false)}>← Vissza</div>
                <div className="sidebar-item" onClick={() => navigate("/settings/profile")}>Személyes profil</div>
                <div className="sidebar-item" onClick={() => navigate("/settings/vehicle")}>Jármű adatok</div>
                <div className="sidebar-item" onClick={() => navigate("/settings/moto")}>Motor specifikus</div>
                <div className="sidebar-item" onClick={() => navigate("/settings/availability")}>Elérhetőség</div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Menu;