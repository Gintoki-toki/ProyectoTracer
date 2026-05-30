import { useState } from "react";
import { css } from "./styles/global";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <style>{css}</style>

      {!currentUser && (
        <Login onLogin={(user) => setCurrentUser(user)} />
      )}

      {currentUser?.role === "user" && (
        <UserDashboard
          user={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
      )}

      {currentUser?.role === "admin" && (
        <AdminDashboard
          user={currentUser}
          onLogout={() => setCurrentUser(null)}
        />
      )}
    </>
  );
}