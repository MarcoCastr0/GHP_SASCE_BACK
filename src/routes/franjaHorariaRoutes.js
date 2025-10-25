// src/routes/franjaHorariaRoutes.js
import express from "express"
import { FranjaHorariaController } from "../controllers/franjaHorariaController.js"

const router = express.Router()

router.get("/", FranjaHorariaController.obtenerFranjas)
router.get("/:id", FranjaHorariaController.obtenerFranjaPorId)
router.get("/dia/:dia_semana", FranjaHorariaController.obtenerFranjasPorDia)
router.post("/", FranjaHorariaController.crearFranja)
router.put("/:id", FranjaHorariaController.actualizarFranja)
router.delete("/:id", FranjaHorariaController.eliminarFranja)

export default router
