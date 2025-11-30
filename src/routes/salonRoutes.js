// src/routes/salonRoutes.js
import express from "express";
import {
  getSalonesJWT,
  createSalonJWT,
  getEdificiosJWT,
  getTiposRecursoJWT,
  getPeriodosAcademicosJWT,
} from "../controllers/salonController.js";
import {
  getOcupacionesSalonJWT,
  createOcupacionSalonJWT,
  deleteOcupacionSalonJWT,
} from "../controllers/disponibilidadSalonController.js";
import {
  verifyJWT,
  requireCoordinadorInfra,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren JWT y rol COORDINADOR_INFRAESTRUCTURA
router.use(verifyJWT);
router.use(requireCoordinadorInfra);

// CU5: Gestión de salones
router.get("/", getSalonesJWT);
router.post("/", createSalonJWT);
router.get("/edificios", getEdificiosJWT);
router.get("/tipos-recurso", getTiposRecursoJWT);

// CU6: Gestión de disponibilidad horaria
router.get("/periodos-academicos", getPeriodosAcademicosJWT);
router.get("/:id/ocupacion", getOcupacionesSalonJWT);
router.post("/:id/ocupacion", createOcupacionSalonJWT);
router.delete("/ocupacion/:id_ocupacion", deleteOcupacionSalonJWT);

export default router;
