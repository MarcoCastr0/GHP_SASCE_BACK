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

// Configuración de CORS para aceptar peticiones desde GitHub Pages
const allowedOrigins = [
  'https://marcocastr0.github.io',           // GitHub Pages en producción
  'http://localhost:5173',                    // Vite en desarrollo
  'http://localhost:5174',                    // Vite alternativo
  'http://localhost:3000',                    // Otro puerto común
  'http://127.0.0.1:5173',                    // Localhost alternativo
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como Postman, curl, apps móviles)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'La política de CORS no permite el acceso desde este origen.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,                          // Permitir cookies y headers de autenticación
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ CORRECTO: urlencoded

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
