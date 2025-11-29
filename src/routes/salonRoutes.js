// src/routes/salonRoutes.js
import express from "express";
import {
  getSalonesJWT,
  createSalonJWT,
  getEdificiosJWT,
  getTiposRecursoJWT,
} from "../controllers/salonController.js";
import {
  verifyJWT,
  requireCoordinadorInfra,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren JWT y rol COORDINADOR_INFRAESTRUCTURA
router.use(verifyJWT);
router.use(requireCoordinadorInfra);

// Listar salones
router.get("/", getSalonesJWT);

// Registrar nuevo salón
router.post("/", createSalonJWT);

// Obtener edificios (para formulario)
router.get("/edificios", getEdificiosJWT);

// Obtener tipos de recurso (para formulario)
router.get("/tipos-recurso", getTiposRecursoJWT);

export default router;
