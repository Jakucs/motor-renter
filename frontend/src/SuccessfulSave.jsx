import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Successful() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="wrapper">
            <div id="formContent" className="fadeInDown" style={{ padding: "40px", textAlign: "center" }}>
                <h2 className="active">Sikeres mentés!</h2>
                <p style={{ color: "#555", marginTop: "10px" }}>
                    Hamarosan átirányítunk a főoldalra...
                </p>
            </div>
        </div>
    );
}

export default Successful;