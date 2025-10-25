// src/routes/especialidadProfesorRoutes.js
import express from "express";
import { especialidadProfesorController } from "../controllers/especialidadProfesorController.js";

const router = express.Router();

router.get("/", especialidadProfesorController.getAll);
router.get("/:id", especialidadProfesorController.getById);
router.post("/", especialidadProfesorController.create);
router.put("/:id", especialidadProfesorController.update);
router.delete("/:id", especialidadProfesorController.delete);

export default router;
