// src/routes/grupoEstudianteRoutes.js
import express from "express";
import {
  getGruposJWT,
  createGrupoJWT,
  getNivelesAcademicosJWT,
} from "../controllers/grupoEstudianteController.js";
import {
  verifyJWT,
  requireCoordinador,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas de este módulo requieren JWT y rol COORDINADOR
router.use(verifyJWT);
router.use(requireCoordinador);

// Listar grupos de estudiantes
router.get("/", getGruposJWT);

// Registrar nuevo grupo
router.post("/", createGrupoJWT);

// Obtener niveles académicos (para el formulario de grupos)
router.get("/niveles-academicos", getNivelesAcademicosJWT);

export default router;
