// src/routes/tipoRecursoRoutes.js
import express from "express"
import { TipoRecursoController } from "../controllers/tipoRecursoController.js"

const router = express.Router()

router.get("/", TipoRecursoController.obtenerTiposRecurso)
router.get("/:id", TipoRecursoController.obtenerTipoRecursoPorId)
router.post("/", TipoRecursoController.crearTipoRecurso)
router.put("/:id", TipoRecursoController.actualizarTipoRecurso)
router.delete("/:id", TipoRecursoController.eliminarTipoRecurso)

export default router
