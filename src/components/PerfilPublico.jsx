import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerPerfil, agregarAmigo } from "../services/api";
import { G } from "../styles/global";

export default function PerfilPublico() {
  const { id }                    = useParams();
  const navigate                  = useNavigate();
  const [perfil,  setPerfil]      = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error,   setError]       = useState("");
  const [mensaje, setMensaje]     = useState("");
  const [agregando, setAgregando] = useState(false);

  // Obtener usuario actual del localStorage
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual") || "null");

  useEffect(() => {
    obtenerPerfil(id)
      .then((data) => {
        setPerfil(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [id]);

  const handleAgregarAmigo = async () => {
    if (!usuarioActual) {
      setMensaje("Debes iniciar sesión para agregar amigos.");
      return;
    }
    setAgregando(true);
    try {
      await agregarAmigo(usuarioActual.id, parseInt(id));
      setMensaje("¡Amigo agregado correctamente! 🎉");
    } catch (e) {
      setMensaje(e.message);
    } finally {
      setAgregando(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: G.bg }}>
      <p style={{ color: G.muted }}>Cargando perfil...</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: G.bg }}>
      <p style={{ color: G.error }}>{error}</p>
    </div>
  );

  const esMiPerfil = usuarioActual?.id === parseInt(id);

  return (
    <div style={{ minHeight: "100vh", background: G.bg, display: "flex",
      alignItems: "center", justifyContent: "center", padding: "24px" }}>

      <div style={{ background: G.card, borderRadius: "24px", padding: "48px 40px",
        width: "100%", maxWidth: "400px", border: `1px solid ${G.border}`,
        boxShadow: G.shadow, textAlign: "center" }}>

        {/* Avatar */}
        <div style={{ width: "80px", height: "80px", borderRadius: "50%",
          background: G.green, display: "flex", alignItems: "center",
          justifyContent: "center", color: "#fff", fontSize: "32px",
          fontWeight: "700", margin: "0 auto 20px" }}>
          {perfil.nombre[0]}
        </div>

        <h2 style={{ fontSize: "24px", fontWeight: "700",
          color: G.text, marginBottom: "8px" }}>{perfil.nombre}</h2>

        <p style={{ fontSize: "13px", color: G.muted,
          marginBottom: "24px" }}>Perfil TraceQR</p>

        {/* Puntos */}
        <div style={{ background: G.greenLight, borderRadius: "16px",
          padding: "20px", marginBottom: "24px" }}>
          <p style={{ fontSize: "12px", fontWeight: "600", color: G.teal,
            textTransform: "uppercase", letterSpacing: ".07em",
            marginBottom: "8px" }}>Puntos acumulados</p>
          <p style={{ fontSize: "42px", fontWeight: "700",
            color: G.teal }}>{perfil.points?.toLocaleString() ?? "0"}</p>
        </div>

        {/* Mensaje */}
        {mensaje && (
          <div style={{ background: mensaje.includes("correctamente") ? G.greenLight : "#fef0ee",
            color: mensaje.includes("correctamente") ? G.teal : G.error,
            borderRadius: "10px", padding: "10px 14px",
            fontSize: "13px", marginBottom: "16px" }}>
            {mensaje}
          </div>
        )}

        {/* Botón agregar amigo */}
        {!esMiPerfil && (
          <button onClick={handleAgregarAmigo} disabled={agregando}
            style={{ width: "100%", padding: "14px", background: G.teal,
              color: "#fff", border: "none", borderRadius: "12px",
              fontSize: "15px", fontWeight: "600", cursor: "pointer",
              marginBottom: "12px" }}>
            {agregando ? "Agregando..." : "➕ Agregar amigo"}
          </button>
        )}

        {/* Botón volver */}
        <button onClick={() => navigate("/")}
          style={{ width: "100%", padding: "14px", background: G.green,
            color: "#fff", border: "none", borderRadius: "12px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
          Volver al inicio
        </button>

      </div>
    </div>
  );
}