// src/routes/grupoEstudianteRoutes.js
import express from "express";
import {
  getGruposJWT,
  createGrupoJWT,
  getNivelesAcademicosJWT,
  getGrupoByIdJWT,
  updateGrupoJWT,
  desactivarGrupoJWT,
} from "../controllers/grupoEstudianteController.js";
import {
  verifyJWT,
  requireCoordinador,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren JWT y rol COORDINADOR
router.use(verifyJWT);
router.use(requireCoordinador);

// CU3
router.get("/", getGruposJWT);
router.post("/", createGrupoJWT);
router.get("/niveles-academicos", getNivelesAcademicosJWT);

// CU4
router.get("/:id", getGrupoByIdJWT);          // Ver detalle
router.put("/:id", updateGrupoJWT);           // Editar
router.patch("/:id/desactivar", desactivarGrupoJWT); // Desactivar

export default router;
