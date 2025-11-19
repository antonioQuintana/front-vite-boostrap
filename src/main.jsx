// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa el CSS de Bootstrap
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {/*Envuelve con authProvider para usar sus servicios */}
      <BrowserRouter>
        {/* Envuelve App con BrowserRouter */}
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
