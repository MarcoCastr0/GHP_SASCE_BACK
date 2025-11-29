// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = decoded; // { UserID, username, correo, id_rol }
    next();
  });
};

// ADMINISTRADOR = id_rol = 1
export const requireAdmin = (req, res, next) => {
  if (req.user.id_rol !== 1) {
    return res
      .status(403)
      .json({ message: "Requiere rol ADMINISTRADOR (id_rol = 1)" });
  }
  next();
};

// COORDINADOR = id_rol = 2 (ya lo tienes)
export const requireCoordinador = (req, res, next) => {
  if (req.user.id_rol !== 2) {
    return res
      .status(403)
      .json({ message: "Requiere rol COORDINADOR (id_rol = 2)" });
  }
  next();
};

// NUEVO: COORDINADOR_INFRAESTRUCTURA = id_rol = 3 (ajusta si es otro)
export const requireCoordinadorInfra = (req, res, next) => {
  if (req.user.id_rol !== 3) {
    return res.status(403).json({
      message: "Requiere rol COORDINADOR_INFRAESTRUCTURA (id_rol = 3)",
    });
  }
  next();
};
