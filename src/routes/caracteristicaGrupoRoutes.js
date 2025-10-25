// src/routes/caracteristicaGrupoRoutes.js
import express from "express"
import { CaracteristicaGrupoController } from "../controllers/caracteristicaGrupoController.js"

const router = express.Router()

router.get("/", CaracteristicaGrupoController.obtenerCaracteristicas)
router.get("/:id", CaracteristicaGrupoController.obtenerCaracteristicaPorId)
router.get("/grupo/:id_grupo", CaracteristicaGrupoController.obtenerCaracteristicasPorGrupo)
router.post("/", CaracteristicaGrupoController.crearCaracteristica)
router.put("/:id", CaracteristicaGrupoController.actualizarCaracteristica)
router.delete("/:id", CaracteristicaGrupoController.eliminarCaracteristica)

export default router
