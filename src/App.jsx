import { useState } from "react";
import { css } from "./styles/global";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [vista, setVista]             = useState("login");

  if (currentUser?.role === "user") {
    return <><style>{css}</style>
      <UserDashboard user={currentUser}
        onLogout={() => { setCurrentUser(null); setVista("login"); }} />
    </>;
  }

  if (currentUser?.role === "admin") {
    return <><style>{css}</style>
      <AdminDashboard user={currentUser}
        onLogout={() => { setCurrentUser(null); setVista("login"); }} />
    </>;
  }

  return (
    <>
      <style>{css}</style>
      {vista === "login" && (
        <Login
          onLogin={setCurrentUser}
          onRegistrar={() => setVista("register")}
        />
      )}
      {vista === "register" && (
        <Register
          onRegistro={setCurrentUser}
          onVolver={() => setVista("login")}
        />
      )}
    </>
  );
}