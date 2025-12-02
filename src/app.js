// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import grupoEstudianteRoutes from "./routes/grupoEstudianteRoutes.js";
import salonRoutes from "./routes/salonRoutes.js";
import profesorRoutes from "./routes/profesorRoutes.js";
import disponibilidadProfesorRoutes from "./routes/disponibilidadProfesorRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // agrega esta línea

app.use("/api/auth", authRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/coordinador/grupos", grupoEstudianteRoutes);
app.use("/api/coordinador-infra/salones", salonRoutes);

// NUEVO: gestión de profesores para coordinador académico
app.use("/api/coordinador/profesores", profesorRoutes);
app.use("/api/disponibilidad-profesor", disponibilidadProfesorRoutes);


app.get("/", (req, res) => {
  res.send("🚀 API GHP_SASCE (Supabase) - Sistema de Asignación de Salones");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error del servidor" });
});

export default app;
