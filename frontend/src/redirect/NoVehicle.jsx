import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function noVehicle() {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/settings/vehicle");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

        return (
        <div className="wrapper">
            <div id="formContent" className="fadeInDown" style={{ padding: "40px", textAlign: "center" }}>
                <h2 className="active">Gépjárműt nem adtál meg!</h2>
                <p style={{ color: "#555", marginTop: "10px" }}>
                    Hamarosan átirányítunk a jármű beállításokhoz...
                </p>
            </div>
        </div>
    );
}

export default NoVehicle;