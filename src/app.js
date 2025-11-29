// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import grupoEstudianteRoutes from "./routes/grupoEstudianteRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de administración de usuarios (CU1, solo admin)
app.use("/api/admin/users", userRoutes);

// Rutas de coordinador para grupos de estudiantes (CU3)
app.use("/api/coordinador/grupos", grupoEstudianteRoutes);

// Health check / raíz
app.get("/", (req, res) => {
  res.send("API GHP-SASCE - Backend en ejecución");
});

// Manejador de errores genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error del servidor" });
});

export default app;
