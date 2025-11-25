// src/routes/userRoutes.js
import express from "express";
import {
  getUsuarios,
  getUsuarioPorId,
  postUsuario,
  putUsuario,
  deleteUsuario,
  activateUsuario,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuarioPorId);
router.post("/", postUsuario);
router.put("/:id", putUsuario);
router.delete("/:id", deleteUsuario);
router.patch("/:id/activate", activateUsuario);

export default router;