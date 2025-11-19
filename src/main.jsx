// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* Envuelve App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
