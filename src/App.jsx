import { Routes, Route } from "react-router-dom";
import AppNavbar from "./Components/AppNavbar";
import Home from "./Components/Home";
import About from "./Components/About";
import AppFooter from "./Components/AppFooter";
import "./App.css";
import Productos from "./Pages/Productos";
import Carrito from "./Components/Carrito/Carrito";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsers, getProducts, setUser } from "./redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      const userData = {
        ...user,
        isAdmin: user.email === 'admin@ejemplo.com'
      };
      dispatch(setUser(userData));
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
