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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/");
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
                <div className="sidebar-item" onClick={() => navigate("/settings/availability")}>Elérhetőség</div>
                <div className="sidebar-item" onClick={handleLogout}>Kilépés</div>
              </>
            ) : (
              <>
                <div className="sidebar-item" onClick={() => setSettingsOpen(false)}>← Vissza</div>
                <div className="sidebar-item" onClick={() => navigate("/settings/profile")}>Személyes adatok</div>
                <div className="sidebar-item" onClick={() => navigate("/settings/vehicle")}>Jármű adatok</div>
                <div className="sidebar-item" onClick={() => navigate("/settings/riding-gear")}>Ruházat</div>
                <div className="sidebar-item" onClick={() => navigate("/settings/driver-status")}>Sofőr státusz</div>
                {localStorage.getItem("role") === "ADMIN" && (
                    <div className="sidebar-item" onClick={() => navigate("/admin/users")}>Admin</div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Menu;