// src/routes/salonRoutes.js
import express from "express"
import { SalonController } from "../controllers/salonController.js"

const router = express.Router()

router.get("/", SalonController.obtenerSalones)
router.get("/:id", SalonController.obtenerSalonPorId)
router.get("/edificio/:id_edificio", SalonController.obtenerSalonesPorEdificio)
router.get("/buscar/capacidad", SalonController.obtenerSalonesPorCapacidad)
router.post("/", SalonController.crearSalon)
router.put("/:id", SalonController.actualizarSalon)
router.delete("/:id", SalonController.eliminarSalon)

export default router
