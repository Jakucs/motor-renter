import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authFetch } from "./utils/authFetch";
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
import About from "./About";
import RidingGear from "./RidingGear";
import DriverStatus from "./DriverStatus";
import NoPhoneNumber from "./redirect/NoPhoneNumber";
import { useEffect, useState } from "react";
import LocationTracker from "./LocationTracker";
import ChangePassword from "./ChangePassword";
import AdminRoute from "./AdminRoute";
import AdminUsers from "./AdminUsers";
import PendingOrders from "./PendingOrders";

function App() {
    const [role, setRole] = useState("");
    const [isActive, setIsActive] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) return;

      authFetch(`http://localhost:8080/api/profile`)
        .then(res => res.json())
        .then(user => {
          setRole(user.role ?? "");
          setIsActive(user.isActive ?? false);
        });
  }, []);

  return (
    <>
    <LocationTracker role={role} isActive={isActive} />
    <PendingOrders role={role} />
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
      <Route path="/settings/riding-gear" element={<ProtectedRoute><RidingGear /></ProtectedRoute>}/>
      <Route path="/settings/driver-status" element={<ProtectedRoute><DriverStatus /></ProtectedRoute>} />
      <Route path="/settings/change-password" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
      <Route path="/no-phone-number" element={<NoPhoneNumber />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers/></AdminRoute>}/>
    </Routes>
    </>
  );
}

export default App;