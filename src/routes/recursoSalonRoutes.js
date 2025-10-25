// src/routes/recursoSalonRoutes.js
import express from "express"
import { RecursoSalonController } from "../controllers/recursoSalonController.js"

const router = express.Router()

router.get("/", RecursoSalonController.obtenerRecursos)
router.get("/:id", RecursoSalonController.obtenerRecursoPorId)
router.get("/salon/:id_salon", RecursoSalonController.obtenerRecursosPorSalon)
router.post("/", RecursoSalonController.crearRecurso)
router.put("/:id", RecursoSalonController.actualizarRecurso)
router.delete("/:id", RecursoSalonController.eliminarRecurso)

export default router
