import { useState, useEffect } from "react";
import { G } from "../styles/global";
import { obtenerUsuarios } from "../services/api";

export default function AdminDashboard({ user, onLogout }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    obtenerUsuarios()
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e.message);
        setLoading(false);
      });
  }, []);

  const soloUsuarios = usuarios.filter((u) => u.role === "user");

  const stats = [
    { label: "Usuarios totales", value: soloUsuarios.length,                                    icon: "👥" },
    { label: "Puntos otorgados", value: soloUsuarios.reduce((a, u) => a + (u.points || 0), 0), icon: "⭐" },
    { label: "Escaneos hoy",     value: 128,                                                     icon: "📲" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: G.bg }}>

      {/* Barra superior */}
      <div style={{ background: G.card, borderBottom: `1px solid ${G.border}`,
        padding: "0 32px", height: "60px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", background: G.green,
            borderRadius: "8px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "16px" }}>🌿</div>
          <span style={{ fontSize: "20px", fontWeight: "700", color: G.text }}>
            TraceQR{" "}
            <span style={{ fontSize: "12px", color: G.teal,
              fontWeight: "600" }}>Admin</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%",
            background: G.gold, display: "flex", alignItems: "center",
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

        {/* Banner admin */}
        <div style={{ background: G.teal, borderRadius: "18px",
          padding: "28px 32px", marginBottom: "28px", color: "#fff",
          display: "flex", alignItems: "center",
          justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "26px", fontWeight: "700",
              marginBottom: "4px" }}>Panel de Administración</h2>
            <p style={{ fontSize: "14px", opacity: ".85" }}>
              Gestión de usuarios y estadísticas del sistema TraceQR
            </p>
          </div>
          <span style={{ fontSize: "48px" }}>🛡️</span>
        </div>

        {/* Tarjetas de estadísticas */}
        <div style={{ display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px", marginBottom: "28px" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: G.card, borderRadius: "18px",
              padding: "24px", border: `1px solid ${G.border}`,
              boxShadow: G.shadow }}>
              <p style={{ fontSize: "12px", fontWeight: "600", color: G.muted,
                textTransform: "uppercase", letterSpacing: ".07em",
                marginBottom: "8px" }}>{s.icon} {s.label}</p>
              <p style={{ fontSize: "30px", fontWeight: "700",
                color: G.text }}>{s.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Tabla de usuarios */}
        <div style={{ background: G.card, borderRadius: "18px",
          padding: "24px", border: `1px solid ${G.border}`,
          boxShadow: G.shadow }}>
          <h3 style={{ fontSize: "15px", fontWeight: "600",
            marginBottom: "16px", color: G.text }}>Usuarios registrados</h3>

          {loading ? (
            <p style={{ color: G.muted, fontSize: "14px" }}>Cargando usuarios...</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse",
              fontSize: "14px" }}>
              <thead>
                <tr>
                  {["Nombre", "Correo", "Rol", "Puntos"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px",
                      fontSize: "12px", fontWeight: "600", color: G.muted,
                      textTransform: "uppercase", letterSpacing: ".07em",
                      borderBottom: `2px solid ${G.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u, i) => (
                  <tr key={i}>
                    <td style={{ padding: "14px 16px",
                      borderBottom: `1px solid ${G.border}` }}>
                      <strong>{u.nombre}</strong>
                    </td>
                    <td style={{ padding: "14px 16px", color: G.muted,
                      borderBottom: `1px solid ${G.border}` }}>{u.email}</td>
                    <td style={{ padding: "14px 16px",
                      borderBottom: `1px solid ${G.border}` }}>
                      <span style={{
                        display: "inline-block", padding: "3px 12px",
                        borderRadius: "20px", fontSize: "12px", fontWeight: "600",
                        background: u.role === "admin" ? "#fff3cd" : G.greenLight,
                        color:      u.role === "admin" ? "#856404" : G.teal }}>
                        {u.role === "admin" ? "Admin" : "Usuario"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px",
                      borderBottom: `1px solid ${G.border}` }}>
                      {u.points ? u.points.toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}