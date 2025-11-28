// src/routes/userRoutes.js
import express from "express";
import {
  createUserJWT,
  getAllUsersJWT,
  desactivarUsuarioJWT,
  activarUsuarioJWT,
} from "../controllers/userController.js";
import { verifyJWT, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyJWT);
router.use(requireAdmin);

router.get("/", getAllUsersJWT);
router.post("/", createUserJWT);
router.patch("/:id/desactivar", desactivarUsuarioJWT);
router.patch("/:id/activar", activarUsuarioJWT);

export default router;
