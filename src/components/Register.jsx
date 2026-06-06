import { useState } from "react";
import { registrarUsuario } from "../services/api";
import { G } from "../styles/global";

export default function Register({ onRegistro, onVolver }) {
  const [nombre,   setNombre]   = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handle = async () => {
    setError("");
    if (!nombre || !email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      const user = await registrarUsuario(nombre, email, password);
      onRegistro(user);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handle();
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "24px" }}>

      <div style={{ background: G.card, borderRadius: "24px", padding: "48px 40px",
        width: "100%", maxWidth: "400px", border: `1px solid ${G.border}`,
        boxShadow: G.shadow }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px",
          justifyContent: "center", marginBottom: "28px" }}>
          <div style={{ width: "40px", height: "40px", background: G.green,
            borderRadius: "10px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "20px" }}>🌿</div>
          <span style={{ fontSize: "26px", fontWeight: "700",
            color: G.text }}>TraceQR</span>
        </div>

        <p style={{ textAlign: "center", fontSize: "13px", color: G.muted,
          textTransform: "uppercase", letterSpacing: ".06em",
          marginBottom: "32px" }}>Crear cuenta</p>

        {/* Campo nombre */}
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={handleKey}
            style={{ width: "100%", padding: "13px 16px", border: `1.5px solid ${G.border}`,
              borderRadius: "12px", fontSize: "14px", outline: "none",
              background: "#fafffe", color: G.text }}
          />
        </div>

        {/* Campo email */}
        <div style={{ marginBottom: "16px" }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKey}
            style={{ width: "100%", padding: "13px 16px", border: `1.5px solid ${G.border}`,
              borderRadius: "12px", fontSize: "14px", outline: "none",
              background: "#fafffe", color: G.text }}
          />
        </div>

        {/* Campo contraseña */}
        <div style={{ marginBottom: "16px" }}>
          <input
            type="password"
            placeholder="Contraseña (mín. 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKey}
            style={{ width: "100%", padding: "13px 16px", border: `1.5px solid ${G.border}`,
              borderRadius: "12px", fontSize: "14px", outline: "none",
              background: "#fafffe", color: G.text }}
          />
        </div>

        {/* Botón */}
        <button
          onClick={handle}
          disabled={loading}
          style={{ width: "100%", padding: "14px", background: G.green,
            color: "#fff", border: "none", borderRadius: "12px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
          {loading ? "Registrando…" : "Crear cuenta"}
        </button>

        {/* Error */}
        {error && (
          <div style={{ background: "#fef0ee", border: `1px solid #f5c2bc`,
            color: G.error, borderRadius: "10px", padding: "10px 14px",
            fontSize: "13px", marginTop: "14px", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Volver al login */}
        <div style={{ textAlign: "center", marginTop: "20px",
          fontSize: "13px", color: G.muted }}>
          ¿Ya tienes cuenta?{" "}
          <span onClick={onVolver}
            style={{ color: G.teal, fontWeight: "600", cursor: "pointer" }}>
            Inicia sesión
          </span>
        </div>

      </div>
    </div>
  );
}