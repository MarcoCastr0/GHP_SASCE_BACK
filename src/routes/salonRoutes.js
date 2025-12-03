// src/routes/salonRoutes.js
import express from "express";
import {
  getSalonesJWT,
  getSalonByIdJWT,
  createSalonJWT,
  updateSalonJWT,
  deleteSalonJWT,
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

// ========== DATOS DE APOYO ==========
router.get("/edificios", getEdificiosJWT);
router.get("/tipos-recurso", getTiposRecursoJWT);
router.get("/periodos-academicos", getPeriodosAcademicosJWT);

// ========== GESTIÓN DE SALONES (CU5) ==========
router.get("/", getSalonesJWT);                    // Listar todos
router.get("/:id", getSalonByIdJWT);              // Ver detalle
router.post("/", createSalonJWT);                  // Crear
router.put("/:id", updateSalonJWT);               // Editar
router.delete("/:id", deleteSalonJWT);            // Eliminar (baja lógica)

// ========== GESTIÓN DE DISPONIBILIDAD HORARIA (CU6) ==========
router.get("/:id/ocupacion", getOcupacionesSalonJWT);           // Ver ocupaciones
router.post("/:id/ocupacion", createOcupacionSalonJWT);         // Crear ocupación
router.delete("/ocupacion/:id_ocupacion", deleteOcupacionSalonJWT); // Eliminar ocupación

export default router;