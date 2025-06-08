import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRoutes from "./routes/productsRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import { testConnection } from "./db/db.js";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middlewares básicos
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});
// Rutas de la API
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);

// Ruta de prueba básica
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});
// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
});
// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    message:
      process.env.NODE_ENV === "development" ? err.message : "Algo salió mal",
  });
});
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
  console.log(`📡 API disponible en: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);

  // Probar conexión a la base de datos
  await testConnection();
});
