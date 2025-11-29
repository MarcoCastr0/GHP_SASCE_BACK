// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  console.log("=== verifyJWT ===");
  console.log("authHeader recibido:", authHeader);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Error al verificar token:", err.message);
      return res.status(403).json({ message: "Token inválido" });
    }
    console.log("Token válido, payload:", decoded);
    // decoded: { UserID, username, correo, id_rol, iat, exp }
    req.user = decoded;
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

// COORDINADOR = id_rol = 2
export const requireCoordinador = (req, res, next) => {
  if (req.user.id_rol !== 2) {
    return res
      .status(403)
      .json({ message: "Requiere rol COORDINADOR (id_rol = 2)" });
  }
  next();
};
