import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { css } from "./styles/global";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import PerfilPublico from "./components/PerfilPublico";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [vista, setVista]             = useState("login");

  return (
    <>
      <style>{css}</style>
      <Routes>

        {/* Perfil público — accesible sin login */}
        <Route path="/perfil/:id" element={<PerfilPublico />} />

        {/* App principal */}
        <Route path="*" element={
          <>
            {currentUser?.role === "user" && (
              <UserDashboard
                user={currentUser}
                onLogout={() => {
                  localStorage.removeItem("usuarioActual");
                  setCurrentUser(null);
                  setVista("login");
                }}
              />
            )}
            {currentUser?.role === "admin" && (
              <AdminDashboard
                user={currentUser}
                onLogout={() => {
                  localStorage.removeItem("usuarioActual");
                  setCurrentUser(null);
                  setVista("login");
                }}
              />
            )}
            {!currentUser && vista === "login" && (
              <Login
                onLogin={(user) => {
                  localStorage.setItem("usuarioActual", JSON.stringify(user));
                  setCurrentUser(user);
                }}
                onRegistrar={() => setVista("register")}
              />
            )}
            {!currentUser && vista === "register" && (
              <Register
                onRegistro={(user) => {
                  localStorage.setItem("usuarioActual", JSON.stringify(user));
                  setCurrentUser(user);
                }}
                onVolver={() => setVista("login")}
              />
            )}
          </>
        } />

      </Routes>
    </>
  );
}