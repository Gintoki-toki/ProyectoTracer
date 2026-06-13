import { useState, useEffect } from "react";
import { G } from "../styles/global";
import MiQR from "./MiQR";
import { obtenerAmigos } from "../services/api";

export default function UserDashboard({ user, onLogout }) {
  const [mostrarQR, setMostrarQR] = useState(false);
  const [amigos,    setAmigos]    = useState([]);

  useEffect(() => {
    obtenerAmigos(user.id)
      .then((data) => setAmigos(data))
      .catch((e) => console.error(e.message));
  }, [user.id]);

  const activities = [
    { text: "Escaneaste un producto TraceQR", time: "Hace 2h" },
    { text: "Ganaste 35 puntos por reciclaje",  time: "Hoy" },
    { text: "Desbloqueaste la insignia 🌿",      time: "Ayer" },
    { text: "Completaste tu perfil ecológico",   time: "Hace 3 días" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: G.bg }}>

      {/* Modal QR */}
      {mostrarQR && <MiQR user={user} onCerrar={() => setMostrarQR(false)} />}

      {/* Barra superior */}
      <div style={{ background: G.card, borderBottom: `1px solid ${G.border}`,
        padding: "0 32px", height: "60px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", background: G.green,
            borderRadius: "8px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "16px" }}>🌿</div>
          <span style={{ fontSize: "20px", fontWeight: "700",
            color: G.text }}>TraceQR</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%",
            background: G.green, display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontWeight: "700",
            fontSize: "14px" }}>{user.nombre[0]}</div>
          <button onClick={onLogout}
            style={{ padding: "7px 16px", background: "transparent",
              border: `1.5px solid ${G.border}`, borderRadius: "8px",
              fontSize: "13px", color: G.muted, cursor: "pointer" }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ padding: "36px 32px", maxWidth: "960px", margin: "0 auto" }}>

        <h1 style={{ fontSize: "32px", color: G.text, marginBottom: "6px" }}>
          Hola, {user.nombre} 🌱
        </h1>
        <p style={{ color: G.muted, fontSize: "14px", marginBottom: "32px" }}>
          Bienvenido de vuelta. Sigues haciendo la diferencia.
        </p>

        {/* Tarjetas */}
        <div style={{ display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px", marginBottom: "32px" }}>

          <div style={{ background: G.card, borderRadius: "18px",
            padding: "24px", border: `1px solid ${G.border}`,
            boxShadow: G.shadow }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: G.muted,
              textTransform: "uppercase", letterSpacing: ".07em",
              marginBottom: "8px" }}>Puntos acumulados</p>
            <p style={{ fontSize: "38px", fontWeight: "700", color: G.text }}>
              {user.points?.toLocaleString() ?? "0"}
              <span style={{ marginLeft: "10px", background: G.greenLight,
                color: G.teal, borderRadius: "20px", padding: "3px 10px",
                fontSize: "13px", fontWeight: "700" }}>{user.badge}</span>
            </p>
          </div>

          <div style={{ background: G.card, borderRadius: "18px",
            padding: "24px", border: `1px solid ${G.border}`,
            boxShadow: G.shadow }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: G.muted,
              textTransform: "uppercase", letterSpacing: ".07em",
              marginBottom: "12px" }}>Insignias obtenidas</p>
            <div style={{ display: "flex", gap: "12px" }}>
              {["🌿", "♻️", "💧", "🌍"].map((b, i) => (
                <div key={i} style={{ width: "52px", height: "52px",
                  borderRadius: "50%", background: G.greenLight,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "24px",
                  border: `2px solid ${G.border}` }}>{b}</div>
              ))}
            </div>
          </div>

          {/* Tarjeta QR */}
          <div style={{ background: G.card, borderRadius: "18px",
            padding: "24px", border: `1px solid ${G.border}`,
            boxShadow: G.shadow, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <p style={{ fontSize: "12px", fontWeight: "600", color: G.muted,
              textTransform: "uppercase", letterSpacing: ".07em" }}>Mi código QR</p>
            <span style={{ fontSize: "40px" }}>📱</span>
            <button onClick={() => setMostrarQR(true)}
              style={{ padding: "10px 20px", background: G.green,
                color: "#fff", border: "none", borderRadius: "10px",
                fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
              Ver mi QR
            </button>
          </div>

        </div>

        {/* Lista de amigos */}
        <div style={{ background: G.card, borderRadius: "18px",
          padding: "24px", border: `1px solid ${G.border}`,
          boxShadow: G.shadow, marginBottom: "32px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600",
            marginBottom: "16px", color: G.text }}>
            Mis amigos {amigos.length > 0 && `(${amigos.length})`}
          </h3>
          {amigos.length === 0 ? (
            <p style={{ color: G.muted, fontSize: "14px" }}>
              Aún no tienes amigos. ¡Comparte tu QR para conectar!
            </p>
          ) : (
            amigos.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center",
                gap: "12px", padding: "10px 0",
                borderBottom: i < amigos.length - 1
                  ? `1px solid ${G.border}` : "none" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%",
                  background: G.green, display: "flex", alignItems: "center",
                  justifyContent: "center", color: "#fff", fontWeight: "700",
                  fontSize: "14px" }}>{a.nombre[0]}</div>
                <span style={{ fontSize: "14px", fontWeight: "500",
                  color: G.text }}>{a.nombre}</span>
                <span style={{ marginLeft: "auto", background: G.greenLight,
                  color: G.teal, borderRadius: "20px", padding: "3px 10px",
                  fontSize: "12px", fontWeight: "600" }}>
                  {a.points?.toLocaleString() ?? "0"} pts
                </span>
              </div>
            ))
          )}
        </div>

        {/* Actividad reciente */}
        <div style={{ background: G.card, borderRadius: "18px",
          padding: "24px", border: `1px solid ${G.border}`,
          boxShadow: G.shadow }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600",
            marginBottom: "16px", color: G.text }}>Actividad reciente</h3>
          {activities.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center",
              gap: "12px", padding: "10px 0",
              borderBottom: i < activities.length - 1
                ? `1px solid ${G.border}` : "none" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%",
                background: G.green, flexShrink: 0 }} />
              <span style={{ fontSize: "13.5px", color: G.text }}>{a.text}</span>
              <span style={{ fontSize: "12px", color: G.muted,
                marginLeft: "auto" }}>{a.time}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}