

import express from "express";
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";

// Definir las rutas para productos
router.get("/", getAllProducts); // Obtener todos los productos
router.get("/:id", getProductById); // Obtener un producto por ID
router.post("/", createProduct); // Crear un nuevo producto
router.put("/:id", updateProduct); // Actualizar un producto por ID
router.delete("/:id", deleteProduct); // Eliminar un producto por ID

export default router;
