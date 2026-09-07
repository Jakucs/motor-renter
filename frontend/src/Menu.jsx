import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 80) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {menuOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />
          <div
            className="sidebar"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="sidebar-item" onClick={() => navigate("/home")}>Főoldal</div>
              <div className="sidebar-item" onClick={() => navigate("/")}>Személyes profil</div>
              <div className="sidebar-item" onClick={() => navigate("/")}>Beállítások</div>
              <div className="sidebar-item" onClick={() => navigate("/")}>Kilépés</div>
          </div>
        </>
      )}
    </>
  );
}

export default Menu;