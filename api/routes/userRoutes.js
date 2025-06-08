import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getUserById, // Ahora coincide con el controlador
  updateUser, // CORREGIDO: sin 's'
  deleteUser, // CORREGIDO: sin 's'
  loginUser,
  registerUser,
} from "../controllers/userController.js";

// Definir las rutas para usuarios
router.get("/", getAllUsers); // Obtener todos los usuarios
router.get("/:id", getUserById); // Obtener un usuario por ID
router.put("/:id", updateUser); // CORREGIDO: Actualizar un usuario por ID
router.delete("/:id", deleteUser); // CORREGIDO: Eliminar un usuario por ID
router.post("/login", loginUser); // Iniciar sesión
router.post("/register", registerUser); // Registrar un nuevo usuario

export default router;
