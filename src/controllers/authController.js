// src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/userModel.js";
import { registrarAuditoria } from "../models/auditoriaModel.js";

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    console.log("=== LOGIN DEBUG ===");
    console.log("req.body:", req.body);

    if (!correo || !password) {
      return res.status(400).json({
        message: "Correo y contraseña requeridos",
      });
    }

    const { data: foundUser, error } = await findUserByEmail(correo);

    console.log("Usuario encontrado:", !!foundUser, "error:", error);

    if (error || !foundUser) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // Verificar que el usuario esté activo
    if (foundUser.esta_activo === false) {
      return res.status(403).json({
        message: "Usuario inactivo. Contacte al administrador.",
      });
    }

    console.log("Campos usuario:", Object.keys(foundUser));
    console.log("hash_contrasena existe:", !!foundUser.hash_contrasena);

    if (!foundUser.hash_contrasena) {
      return res.status(500).json({
        message: "Usuario sin contraseña configurada",
      });
    }

    const matchPassword = await bcrypt.compare(
      password,
      foundUser.hash_contrasena
    );
    console.log("Password match:", matchPassword);

    if (!matchPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    // Generar token con rol
    const accessToken = jwt.sign(
      {
        UserID: foundUser.id_usuario,
        username: foundUser.nombre_usuario,
        correo: foundUser.correo,
        id_rol: foundUser.id_rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Registrar auditoría de LOGIN
    await registrarAuditoria({
      id_usuario: foundUser.id_usuario,
      tipo_accion: "LOGIN",
      tipo_entidad: "USUARIO",
      id_entidad: foundUser.id_usuario,
      valores_nuevos: {
        correo: foundUser.correo,
        id_rol: foundUser.id_rol,
      },
    });

    return res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: foundUser.id_usuario,
        username: foundUser.nombre_usuario,
        correo: foundUser.correo,
        id_rol: foundUser.id_rol,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: err.message });
  }
};