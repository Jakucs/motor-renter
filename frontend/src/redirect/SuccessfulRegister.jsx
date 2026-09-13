import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SuccessfulRegister() {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


      return (
        <div className="wrapper">
        <div id="formContent" className="fadeInDown" style={{ padding: "40px", textAlign: "center" }}>
            <h2 className="active">Sikeres regisztráció!</h2>
            <p style={{ color: "#555", marginTop: "10px" }}>
            Hamarosan átirányítunk a bejelentkezési oldalra...
            </p>
        </div>
        </div>
  );
}

export default SuccessfulRegister;