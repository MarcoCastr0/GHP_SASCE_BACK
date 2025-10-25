// src/routes/restriccionRoutes.js
import express from "express"
import { RestriccionController } from "../controllers/restriccionController.js"

const router = express.Router()

router.get("/", RestriccionController.obtenerRestricciones)
router.get("/:id", RestriccionController.obtenerRestriccionPorId)
router.get("/recurso/:tipo_recurso/:id_recurso", RestriccionController.obtenerRestriccionesPorRecurso)
router.post("/", RestriccionController.crearRestriccion)
router.put("/:id", RestriccionController.actualizarRestriccion)
router.delete("/:id", RestriccionController.eliminarRestriccion)

export default router
