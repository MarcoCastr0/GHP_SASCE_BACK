import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();  // ← SOLO UNA VEZ

import rolRoutes from "./routes/rolRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import authRoutes from './routes/authRoutes.js';

const app = express()
app.use(cors())
app.use(express.json())

// TUS RUTAS EXISTENTES (sin cambios)
app.use("/api/roles", rolRoutes)
app.use("/api/usuarios", userRoutes)


// NUEVAS RUTAS JWT (al final)
app.use('/api/auth', authRoutes);        // POST /api/auth/login
app.use('/api/admin/users', userRoutes);  // GET/POST /api/admin/users (protegidas admin)

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error del servidor' });
});

app.get("/", (req, res) => res.send("🚀 API GHP_SASCE (Supabase) - Sistema de Asignación de Salones"))

export default app
