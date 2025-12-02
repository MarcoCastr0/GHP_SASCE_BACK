import express from "express";
import { verifyJWT, requireCoordinador } from "../middleware/authMiddleware.js";
import { disponibilidadProfesorController } from "../controllers/disponibilidadProfesorController.js";

const router = express.Router();

// Obtener disponibilidad
router.get(
  "/:id_profesor",
  verifyJWT,
  disponibilidadProfesorController.getDisponibilidadProfesorJWT
);

// Crear disponibilidad
router.post(
  "/:id_profesor",
  verifyJWT,
  requireCoordinador,
  disponibilidadProfesorController.createDisponibilidadProfesorJWT
);

// Actualizar
router.put(
  "/edit/:id",
  verifyJWT,
  requireCoordinador,
  disponibilidadProfesorController.updateDisponibilidadProfesorJWT
);

// Eliminar
router.delete(
  "/delete/:id",
  verifyJWT,
  requireCoordinador,
  disponibilidadProfesorController.deleteDisponibilidadProfesorJWT
);

export default router;
