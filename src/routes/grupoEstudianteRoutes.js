// src/routes/grupoEstudianteRoutes.js
import express from "express"
import { GrupoEstudianteController } from "../controllers/grupoEstudianteController.js"

const router = express.Router()

router.get("/", GrupoEstudianteController.obtenerGrupos)
router.get("/:id", GrupoEstudianteController.obtenerGrupoPorId)
router.get("/nivel/:id_nivel", GrupoEstudianteController.obtenerGruposPorNivel)
router.post("/", GrupoEstudianteController.crearGrupo)
router.put("/:id", GrupoEstudianteController.actualizarGrupo)
router.delete("/:id", GrupoEstudianteController.eliminarGrupo)

export default router
