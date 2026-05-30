import { useState } from "react";
import { AuthService } from "../classes/Auth";
import { G } from "../styles/global";

const auth = new AuthService();

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handle = () => {
    setError("");
    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      try {
        const user = auth.login(email, password);
        onLogin(user);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }, 800);
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
          marginBottom: "32px" }}>Iniciar Sesión</p>

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
            placeholder="Contraseña"
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
          {loading ? "Ingresando…" : "Iniciar Sesión"}
        </button>

        {/* Error */}
        {error && (
          <div style={{ background: "#fef0ee", border: `1px solid #f5c2bc`,
            color: G.error, borderRadius: "10px", padding: "10px 14px",
            fontSize: "13px", marginTop: "14px", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Hint credenciales */}
        <div style={{ marginTop: "24px", padding: "12px 16px",
          background: G.greenLight, borderRadius: "10px",
          fontSize: "12px", color: G.teal, lineHeight: "1.7" }}>
          <strong>Usuarios de prueba:</strong><br />
          👤 <code>lisa@traceqr.com</code> / <code>usuario123</code><br />
          🛡️ <code>admin@traceqr.com</code> / <code>admin123</code>
        </div>
      </div>
    </div>
  );
}