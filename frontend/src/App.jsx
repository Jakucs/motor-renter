import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import SuccessfulRegister from "./SuccessfulRegister";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/successfulregister" element={<SuccessfulRegister/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;