// src/routes/conflictoRoutes.js
import express from "express"
import { ConflictoController } from "../controllers/conflictoController.js"

const router = express.Router()

router.get("/", ConflictoController.obtenerConflictos)
router.get("/:id", ConflictoController.obtenerConflictoPorId)
router.get("/asignacion/:id_asignacion", ConflictoController.obtenerConflictosPorAsignacion)
router.get("/no-resueltos/todos", ConflictoController.obtenerConflictosNoResueltos)
router.get("/severidad/:severidad", ConflictoController.obtenerConflictosPorSeveridad)
router.post("/", ConflictoController.crearConflicto)
router.put("/:id", ConflictoController.actualizarConflicto)
router.patch("/:id/resolver", ConflictoController.marcarResuelto)
router.delete("/:id", ConflictoController.eliminarConflicto)

export default router
