// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import grupoEstudianteRoutes from "./routes/grupoEstudianteRoutes.js";
import salonRoutes from "./routes/salonRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/coordinador/grupos", grupoEstudianteRoutes);

// NUEVO: salones para coordinador de infraestructura
app.use("/api/coordinador-infra/salones", salonRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API GHP_SASCE (Supabase) - Sistema de Asignación de Salones");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error del servidor" });
});

export default app;
