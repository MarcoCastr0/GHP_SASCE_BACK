// src/routes/ocupacionProfesorRoutes.js
import express from "express"
import { OcupacionProfesorController } from "../controllers/ocupacionProfesorController.js"

const router = express.Router()

router.get("/", OcupacionProfesorController.obtenerOcupaciones)
router.get("/:id", OcupacionProfesorController.obtenerOcupacionPorId)
router.get("/profesor/:id_profesor", OcupacionProfesorController.obtenerOcupacionesPorProfesor)
router.get(
  "/profesor/:id_profesor/periodo/:id_periodo",
  OcupacionProfesorController.obtenerOcupacionesPorProfesorYPeriodo,
)
router.post("/", OcupacionProfesorController.crearOcupacion)
router.put("/:id", OcupacionProfesorController.actualizarOcupacion)
router.delete("/:id", OcupacionProfesorController.eliminarOcupacion)

export default router
