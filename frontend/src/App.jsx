import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Login from "./Login";
import Register from "./Register";
import SuccessfulRegister from "./redirect/SuccessfulRegister";
import Home from "./Home";
import PersonalProfile from "./PersonalProfile";
import Successful from "./redirect/SuccessfulSave";
import VehicleData from "./VehicleProfile";
import Vehicles from "./Vehicles";
import NoVehicle from "./redirect/NoVehicle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/successfulregister" element={<SuccessfulRegister/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/settings/profile" element={<PersonalProfile/>}/>
      <Route path="/successful-save" element={<Successful />} />
      <Route path="/settings/vehicle" element={<Vehicles />} />
      <Route path="/settings/vehicle/new" element={<VehicleData />} />
      <Route path="/settings/vehicle/:id" element={<VehicleData />} />
      <Route path="/no-vehicle" element={<NoVehicle />} />
    </Routes>
  );
}

export default App;