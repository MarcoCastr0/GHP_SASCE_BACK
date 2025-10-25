// src/routes/nivelAcademicoRoutes.js
import express from "express"
import { NivelAcademicoController } from "../controllers/nivelAcademicoController.js"

const router = express.Router()

router.get("/", NivelAcademicoController.obtenerNiveles)
router.get("/:id", NivelAcademicoController.obtenerNivelPorId)
router.post("/", NivelAcademicoController.crearNivel)
router.put("/:id", NivelAcademicoController.actualizarNivel)
router.delete("/:id", NivelAcademicoController.eliminarNivel)

export default router
