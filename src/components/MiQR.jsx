import { QRCodeSVG } from "qrcode.react";
import { G } from "../styles/global";

export default function MiQR({ user, onCerrar }) {
  const url = `${import.meta.env.VITE_APP_URL}/perfil/${user.id}`;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100 }}>

      <div style={{ background: G.card, borderRadius: "24px", padding: "40px",
        width: "100%", maxWidth: "360px", textAlign: "center",
        boxShadow: G.shadow }}>

        <h3 style={{ fontSize: "18px", fontWeight: "700",
          color: G.text, marginBottom: "6px" }}>Mi código QR</h3>
        <p style={{ fontSize: "13px", color: G.muted,
          marginBottom: "24px" }}>Comparte este código para que te encuentren</p>

        <div style={{ display: "flex", justifyContent: "center",
          marginBottom: "24px" }}>
          <QRCodeSVG value={url} size={200}
            bgColor="#ffffff" fgColor={G.teal}
            level="H" includeMargin={true} />
        </div>

        <p style={{ fontSize: "12px", color: G.muted,
          marginBottom: "24px", wordBreak: "break-all" }}>{url}</p>

        <button onClick={onCerrar}
          style={{ width: "100%", padding: "14px", background: G.green,
            color: "#fff", border: "none", borderRadius: "12px",
            fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>
          Cerrar
        </button>

      </div>
    </div>
  );
}