// src/routes/profesorRoutes.js
import express from "express";
import { profesorController } from "../controllers/profesorController.js";

const router = express.Router();

router.get("/", profesorController.getAll);
router.get("/:id", profesorController.getById);
router.post("/", profesorController.create);
router.put("/:id", profesorController.update);
router.delete("/:id", profesorController.delete);

export default router;
