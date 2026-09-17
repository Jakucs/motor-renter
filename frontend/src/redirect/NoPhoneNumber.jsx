import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NoPhoneNumber() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/settings/profile");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="wrapper">
            <div id="formContent" className="fadeInDown" style={{ padding: "40px", textAlign: "center" }}>
                <h2 className="active">Telefonszám nincs megadva!</h2>
                <p style={{ color: "#555", marginTop: "10px" }}>
                    Hamarosan átirányítunk a személyes profilhoz...
                </p>
            </div>
        </div>
    );
}

export default NoPhoneNumber;