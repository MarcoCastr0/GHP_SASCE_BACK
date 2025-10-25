// src/routes/ocupacionGrupoRoutes.js
import express from "express"
import { OcupacionGrupoController } from "../controllers/ocupacionGrupoController.js"

const router = express.Router()

router.get("/", OcupacionGrupoController.obtenerOcupaciones)
router.get("/:id", OcupacionGrupoController.obtenerOcupacionPorId)
router.get("/grupo/:id_grupo", OcupacionGrupoController.obtenerOcupacionesPorGrupo)
router.get("/grupo/:id_grupo/periodo/:id_periodo", OcupacionGrupoController.obtenerOcupacionesPorGrupoYPeriodo)
router.post("/", OcupacionGrupoController.crearOcupacion)
router.put("/:id", OcupacionGrupoController.actualizarOcupacion)
router.delete("/:id", OcupacionGrupoController.eliminarOcupacion)

export default router
