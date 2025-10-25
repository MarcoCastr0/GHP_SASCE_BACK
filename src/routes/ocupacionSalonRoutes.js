// src/routes/ocupacionSalonRoutes.js
import express from "express"
import { OcupacionSalonController } from "../controllers/ocupacionSalonController.js"

const router = express.Router()

router.get("/", OcupacionSalonController.obtenerOcupaciones)
router.get("/:id", OcupacionSalonController.obtenerOcupacionPorId)
router.get("/salon/:id_salon", OcupacionSalonController.obtenerOcupacionesPorSalon)
router.get("/salon/:id_salon/periodo/:id_periodo", OcupacionSalonController.obtenerOcupacionesPorSalonYPeriodo)
router.post("/", OcupacionSalonController.crearOcupacion)
router.put("/:id", OcupacionSalonController.actualizarOcupacion)
router.delete("/:id", OcupacionSalonController.eliminarOcupacion)

export default router
