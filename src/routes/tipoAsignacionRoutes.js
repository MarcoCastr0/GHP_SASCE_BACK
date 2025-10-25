// src/routes/tipoAsignacionRoutes.js
import express from "express"
import { TipoAsignacionController } from "../controllers/tipoAsignacionController.js"

const router = express.Router()

router.get("/", TipoAsignacionController.obtenerTipos)
router.get("/:id", TipoAsignacionController.obtenerTipoPorId)
router.post("/", TipoAsignacionController.crearTipo)
router.put("/:id", TipoAsignacionController.actualizarTipo)
router.delete("/:id", TipoAsignacionController.eliminarTipo)

export default router
