const BASE_URL = "http://localhost:3001/api";

export const loginUsuario = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al iniciar sesión.");
  }

  return data;
};

export const registrarUsuario = async (nombre, email, password) => {
  const response = await fetch(`${BASE_URL}/registro`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ nombre, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al registrarse.");
  }

  return data;
};