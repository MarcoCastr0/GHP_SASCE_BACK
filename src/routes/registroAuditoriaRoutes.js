// src/routes/registroAuditoriaRoutes.js
import express from "express"
import { RegistroAuditoriaController } from "../controllers/registroAuditoriaController.js"

const router = express.Router()

router.get("/", RegistroAuditoriaController.obtenerRegistros)
router.get("/:id", RegistroAuditoriaController.obtenerRegistroPorId)
router.get("/usuario/:id_usuario", RegistroAuditoriaController.obtenerRegistrosPorUsuario)
router.get("/entidad/:tipo_entidad/:id_entidad", RegistroAuditoriaController.obtenerRegistrosPorEntidad)
router.get("/accion/:tipo_accion", RegistroAuditoriaController.obtenerRegistrosPorAccion)
router.post("/", RegistroAuditoriaController.crearRegistro)

export default router
