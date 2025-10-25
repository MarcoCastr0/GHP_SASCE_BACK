// src/routes/ocupacionEstudianteRoutes.js
import express from "express"
import { OcupacionEstudianteController } from "../controllers/ocupacionEstudianteController.js"

const router = express.Router()

router.get("/", OcupacionEstudianteController.obtenerOcupaciones)
router.get("/:id", OcupacionEstudianteController.obtenerOcupacionPorId)
router.get("/estudiante/:id_estudiante", OcupacionEstudianteController.obtenerOcupacionesPorEstudiante)
router.get(
  "/estudiante/:id_estudiante/periodo/:id_periodo",
  OcupacionEstudianteController.obtenerOcupacionesPorEstudianteYPeriodo,
)
router.post("/", OcupacionEstudianteController.crearOcupacion)
router.put("/:id", OcupacionEstudianteController.actualizarOcupacion)
router.delete("/:id", OcupacionEstudianteController.eliminarOcupacion)

export default router
