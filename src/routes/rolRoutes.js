// src/routes/rolRoutes.js
import express from "express";
import { RolController } from "../controllers/rolController.js";

const router = express.Router();

// CRUD rutas
router.get("/", RolController.obtenerRoles);
router.get("/:id", RolController.obtenerRolPorId);
router.post("/", RolController.crearRol);
router.put("/:id", RolController.actualizarRol);
router.delete("/:id", RolController.eliminarRol);

export default router;
