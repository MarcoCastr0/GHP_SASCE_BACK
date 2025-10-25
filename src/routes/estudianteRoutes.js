// src/routes/estudianteRoutes.js
import express from "express";
import { estudianteController } from "../controllers/estudianteController.js";

const router = express.Router();

// Rutas CRUD para estudiantes
router.get("/", estudianteController.getAll);
router.get("/:id", estudianteController.getById);
router.post("/", estudianteController.create);
router.put("/:id", estudianteController.update);
router.delete("/:id", estudianteController.remove);

export default router;
