import { Routes, Route } from "react-router-dom";
import AppNavbar from "./Components/AppNavbar";
import Home from "./Components/Home";
import About from "./Components/About";
import AppFooter from "./Components/AppFooter";
import "./App.css";
import Productos from "./Pages/Productos";


function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Productos />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
