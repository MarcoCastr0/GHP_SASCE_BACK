// src/routes/asignacionRoutes.js
import express from "express"
import { AsignacionController } from "../controllers/asignacionController.js"

const router = express.Router()

router.get("/", AsignacionController.obtenerAsignaciones)
router.get("/:id", AsignacionController.obtenerAsignacionPorId)
router.get("/periodo/:id_periodo", AsignacionController.obtenerAsignacionesPorPeriodo)
router.get("/profesor/:id_profesor", AsignacionController.obtenerAsignacionesPorProfesor)
router.get("/grupo/:id_grupo", AsignacionController.obtenerAsignacionesPorGrupo)
router.get("/salon/:id_salon", AsignacionController.obtenerAsignacionesPorSalon)
router.post("/", AsignacionController.crearAsignacion)
router.put("/:id", AsignacionController.actualizarAsignacion)
router.delete("/:id", AsignacionController.eliminarAsignacion)

export default router
