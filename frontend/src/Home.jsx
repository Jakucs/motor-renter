import Map from "./Map";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div id="formContent" className="fadeInDown" style={{ padding: "40px", textAlign: "center" }}>
        <img src="moto-share.png" alt="logo" width="200" style={{ display: "block", margin: "20px auto" }} />
        <Map></Map>
      </div>
    </div>
  );
}

export default Home;