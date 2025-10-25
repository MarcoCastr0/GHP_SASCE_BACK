// src/routes/estudianteGrupoRoutes.js
import express from "express"
import { EstudianteGrupoController } from "../controllers/estudianteGrupoController.js"

const router = express.Router()

router.get("/", EstudianteGrupoController.obtenerMatriculas)
router.get("/:id", EstudianteGrupoController.obtenerMatriculaPorId)
router.get("/estudiante/:id_estudiante", EstudianteGrupoController.obtenerMatriculasPorEstudiante)
router.get("/grupo/:id_grupo", EstudianteGrupoController.obtenerMatriculasPorGrupo)
router.get("/grupo/:id_grupo/periodo/:id_periodo", EstudianteGrupoController.obtenerMatriculasPorGrupoYPeriodo)
router.post("/", EstudianteGrupoController.crearMatricula)
router.put("/:id", EstudianteGrupoController.actualizarMatricula)
router.delete("/:id", EstudianteGrupoController.eliminarMatricula)

export default router
