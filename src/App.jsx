// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AppNavbar from "./Components/AppNavbar";
import Home from "./Components/Home";
import About from "./Components/About";
import AppFooter from "./Components/AppFooter";
import "./App.css"; // Opcional: para estilos personalizados

function App() {
  return (
    // Usa un contenedor flexbox para empujar el footer hacia abajo si el contenido es corto
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      {/* El main flex-grow-1 ocupará el espacio restante */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <AppFooter /> {/* <-- Coloca el Footer al final */}
    </div>
  );
}

export default App;
