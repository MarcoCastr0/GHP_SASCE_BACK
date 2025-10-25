// src/routes/periodoAcademicoRoutes.js
import { Router } from "express";
import { PeriodoAcademicoController } from "../controllers/periodoAcademicoController.js";

const router = Router();

router.get("/", PeriodoAcademicoController.list);
router.get("/:id", PeriodoAcademicoController.get);
router.post("/", PeriodoAcademicoController.create);
router.put("/:id", PeriodoAcademicoController.update);
router.delete("/:id", PeriodoAcademicoController.remove);

export default router;
