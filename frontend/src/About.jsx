import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <div id="formContent" className="fadeInDown">
                <img
                    src="/moto-share.png"
                    alt="logo"
                    width="200"
                    onClick={() => navigate("/home")}
                    style={{ display: "block", margin: "20px auto 0 auto", cursor: "pointer" }}
                />

                <h2 className="active">Rólunk</h2>

                <div style={{ padding: "20px 30px", textAlign: "center", color: "#555" }}>
                    <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
                        A <strong>Moto-Share</strong> egy modern motorkerékpár megosztó platform, 
                        ami összeköti az utasokat a sofőrökkel. Gyors, biztonságos és megbízható 
                        közlekedést biztosítunk Budapest utcáin.
                    </p>

                    <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
                        <h3 style={{ color: "#0d0d0d", marginBottom: "15px" }}>Kapcsolat</h3>

                        <p>📧 <a href="mailto:moto-share@gmail.com">motosharebudapest@gmail.com</a></p>
                        <p>📞 <a href="tel:06301515743">06301515743</a></p>
                        <p>📍 Budapest, Üllői út 159 6/61</p>
                    </div>
                </div>

                <div id="formFooter">
                    <span
                        onClick={() => navigate(-1)}
                        style={{ color: "#92badd", cursor: "pointer" }}
                    >
                        ← Vissza
                    </span>
                </div>
            </div>
        </div>
    );
}

export default About;