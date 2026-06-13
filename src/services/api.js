const BASE_URL = import.meta.env.VITE_API_URL;

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

//obtener perfil del usuario siendo admin

export const obtenerUsuarios = async () => {
  const response = await fetch(`${BASE_URL}/usuarios`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener usuarios.");
  }

  return data;
};

//obtener perfil al escanear

export const obtenerPerfil = async (id) => {
  const response = await fetch(`${BASE_URL}/perfil/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener perfil.");
  }

  return data;
};

//logica de agregar amigo

export const agregarAmigo = async (usuario_id, amigo_id) => {
  const response = await fetch(`${BASE_URL}/amigos`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ usuario_id, amigo_id }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al agregar amigo.");
  }

  return data;
};

export const obtenerAmigos = async (usuario_id) => {
  const response = await fetch(`${BASE_URL}/amigos/${usuario_id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener amigos.");
  }

  return data;
};