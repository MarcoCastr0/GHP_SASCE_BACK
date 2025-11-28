// src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/userModel.js";

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

    console.log("Campos usuario:", Object.keys(foundUser));
    console.log("hash_contrasena existe:", !!foundUser.hash_contrasena);

    if (!foundUser.hash_contrasena) {
      return res.status(500).json({
        message: "Usuario sin contraseña configurada",
      });
    }

    const matchPassword = await bcrypt.compare(password, foundUser.hash_contrasena);
    console.log("Password match:", matchPassword);

    if (!matchPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

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
