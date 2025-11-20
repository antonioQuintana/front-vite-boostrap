// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import AppNavbar from "./Components/AppNavbar";
import Home from "./Components/Home";
import About from "./Components/About";
import AppFooter from "./Components/AppFooter";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Orders from "./Components/Orders";
import LoginPage from "./Components/LoginPage";
import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

// Admin Components
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ProductForm from "./Components/Admin/ProductForm";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div className="text-center p-5">Loading...</div>;

  return (
    <ProductProvider>
      <CartProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="d-flex flex-column min-vh-100">
          <AppNavbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/tienda" element={<ProductList />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected User Routes */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compras"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/new"
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit/:id"
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <AppFooter />
        </div>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
