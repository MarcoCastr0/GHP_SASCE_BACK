// src/routes/profesorRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  getProfesoresJWT,
  getProfesorByIdJWT,
  createProfesorJWT,
  updateProfesorJWT,
  deleteProfesorJWT,
} from "../controllers/profesorController.js";
import {
  verifyJWT,
  requireCoordinador,
} from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname ?? '').toLowerCase();
    const mimetype = file.mimetype?.toLowerCase() || '';
    if (mimetype === "application/pdf" || ext === ".pdf") {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos PDF"));
    }
  },
});

router.use(verifyJWT);
router.use(requireCoordinador);

router.get("/", getProfesoresJWT);
router.get("/:id", getProfesorByIdJWT);

// CAMBIO: usar .any() para que multer parsee TODOS los campos del form-data
router.post("/", upload.any(), createProfesorJWT);
router.put("/:id", upload.any(), updateProfesorJWT);

router.delete("/:id", deleteProfesorJWT);

export default router;
