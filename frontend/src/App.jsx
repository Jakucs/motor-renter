import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import ProtectedRoute from "./ProtectedRoute";
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

      <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/settings/profile" element={<ProtectedRoute><PersonalProfile/></ProtectedRoute>}/>
      <Route path="/successful-save" element={<ProtectedRoute><Successful /></ProtectedRoute>}/>
      <Route path="/settings/vehicle" element={<ProtectedRoute><Vehicles /></ProtectedRoute>}/>
      <Route path="/settings/vehicle/new" element={<ProtectedRoute><VehicleData /></ProtectedRoute>}/>
      <Route path="/settings/vehicle/:id" element={<ProtectedRoute><VehicleData /></ProtectedRoute>}/>
      <Route path="/no-vehicle" element={<ProtectedRoute><NoVehicle /></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;