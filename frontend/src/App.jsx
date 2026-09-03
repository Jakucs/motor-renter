import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import SuccessfulRegister from "./SuccessfulRegister";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/successfulregister" element={<SuccessfulRegister/>}/>
    </Routes>
  );
}

export default App;