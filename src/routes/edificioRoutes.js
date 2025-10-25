// src/routes/edificioRoutes.js
import express from "express"
import { EdificioController } from "../controllers/edificioController.js"

const router = express.Router()

router.get("/", EdificioController.obtenerEdificios)
router.get("/:id", EdificioController.obtenerEdificioPorId)
router.post("/", EdificioController.crearEdificio)
router.put("/:id", EdificioController.actualizarEdificio)
router.delete("/:id", EdificioController.eliminarEdificio)

export default router
