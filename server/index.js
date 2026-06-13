const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const pool = require("./db/connection");

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor TraceQR funcionando correctamente" });
});

app.post("/api/registro", async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO usuarios (nombre, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, nombre, email, role, points, badge`,
      [nombre, email, password]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (e) {
    console.error("Error en registro:", e.message);
    if (e.code === "23505") {
      res.status(400).json({ error: "Este correo ya está registrado." });
    } else {
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    const resultado = await pool.query(
      `SELECT id, nombre, email, role, points, badge
       FROM usuarios
       WHERE email = $1 AND password = $2`,
      [email, password]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos." });
    }

    res.json(resultado.rows[0]);
  } catch (e) {
    console.error("Error en login:", e.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

//perfil público de prueba para usuario
app.get("/api/perfil/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      `SELECT id, nombre, points
       FROM usuarios
       WHERE id = $1`,
      [id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json(resultado.rows[0]);
  } catch (e) {
    console.error("Error al obtener perfil:", e.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

//logica del admin para ver los usuarios
app.get("/api/usuarios", async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT id, nombre, email, role, points, badge
       FROM usuarios
       ORDER BY points DESC`
    );
    res.json(resultado.rows);
  } catch (e) {
    console.error("Error al obtener usuarios:", e.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

//logica para agregar amigos
// ── Agregar amigo ───────────────────────────────────────────────────────
app.post("/api/amigos", async (req, res) => {
  const { usuario_id, amigo_id } = req.body;

  if (usuario_id === amigo_id) {
    return res.status(400).json({ error: "No puedes agregarte a ti mismo." });
  }

  try {
    await pool.query(
      `INSERT INTO amigos (usuario_id, amigo_id)
       VALUES ($1, $2)`,
      [usuario_id, amigo_id]
    );
    res.status(201).json({ mensaje: "Amigo agregado correctamente." });
  } catch (e) {
    if (e.code === "23505") {
      res.status(400).json({ error: "Ya es tu amigo." });
    } else {
      console.error("Error al agregar amigo:", e.message);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  }
});

// ── Obtener lista de amigos ─────────────────────────────────────────────
app.get("/api/amigos/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT u.id, u.nombre, u.points
       FROM amigos a
       JOIN usuarios u ON u.id = a.amigo_id
       WHERE a.usuario_id = $1
       ORDER BY u.nombre ASC`,
      [usuario_id]
    );
    res.json(resultado.rows);
  } catch (e) {
    console.error("Error al obtener amigos:", e.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});