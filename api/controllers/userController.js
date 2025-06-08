// Controlador para manejar las operaciones relacionadas con los usuarios
// Este archivo maneja las operaciones CRUD para los usuarios

import db from "../db/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res
      .status(500)
      .json({ message: "Error al obtener usuarios", error: error.message });
  }
};

// CORREGIDO: getUserById (sin 's') para consistencia
export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    res
      .status(500)
      .json({ message: "Error al obtener usuario", error: error.message });
  }
};

// CORREGIDO: updateUser (sin 's') para consistencia
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, firstName, lastName } = req.body;

    if (!username || !email) {
      return res
        .status(400)
        .json({ message: "Username y email son requeridos" });
    }

    const [result] = await db.query(
      "UPDATE users SET username = ?, email = ?, firstName = ?, lastName = ? WHERE id = ?",
      [username, email, firstName, lastName, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No se encontró usuario con ID ${id}` });
    }

    res.json({
      id: parseInt(id),
      username,
      email,
      firstName,
      lastName,
      message: "Usuario actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res
      .status(500)
      .json({ message: "Error al actualizar usuario", error: error.message });
  }
};

// CORREGIDO: deleteUser (sin 's') para consistencia
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No se encontró usuario con ID ${id}` });
    }

    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res
      .status(500)
      .json({ message: "Error al eliminar usuario", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // No devolver la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = rows[0];
    res.json({
      message: "Login exitoso",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res
      .status(500)
      .json({ message: "Error en el login", error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email y contraseña son requeridos" });
    }

    // Verificar si el usuario ya existe
    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res
        .status(409)
        .json({ message: "El email o username ya está registrado" });
    }

    const [result] = await db.query(
      "INSERT INTO users (username, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?)",
      [username, email, password, firstName, lastName] // En producción, hashear la contraseña
    );

    res.status(201).json({
      id: result.insertId,
      username,
      email,
      firstName,
      lastName,
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
};
