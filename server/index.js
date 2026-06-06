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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});