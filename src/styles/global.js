// ── Paleta de colores ──────────────────────────────────────────────────────
export const G = {
  green:      "#2ECC71",
  greenDark:  "#1a7a45",
  greenLight: "#d4f5e3",
  teal:       "#0e8f5e",
  bg:         "#f0f7f2",
  card:       "#ffffff",
  text:       "#1a2e22",
  muted:      "#6b8c78",
  border:     "#c8e6d4",
  error:      "#e74c3c",
  gold:       "#f0c040",
  shadow:     "0 8px 32px rgba(46,204,113,0.13)",
};

export const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${G.bg};
    min-height: 100vh;
    color: ${G.text};
  }
`;