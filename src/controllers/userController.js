// src/controllers/userController.js
import bcrypt from "bcryptjs";
import {
  createUserBasic,
  findUserByEmail,
  getAllUsersBasic,
  eliminarUsuario,
  activarUsuario,
} from "../models/userModel.js";
import { findRolByName } from "../models/rolModel.js";

// Crear usuario (vía JWT, solo ADMINISTRADOR)
export const createUserJWT = async (req, res) => {
  try {
    const { nombre_usuario, correo, password, nombre_rol, nombre, apellido } =
      req.body;

    if (!nombre_usuario || !correo || !password || !nombre_rol || !nombre || !apellido) {
      return res.status(400).json({
        message:
          "Todos los campos son obligatorios: nombre_usuario, correo, password, nombre_rol, nombre, apellido",
      });
    }

    // Validar rol
    const { data: rolExist } = await findRolByName(nombre_rol);
    if (!rolExist) {
      return res.status(400).json({ message: "Rol no válido" });
    }

    // Validar correo único
    const { data: duplicate } = await findUserByEmail(correo);
    if (duplicate) {
      return res.status(409).json({ message: "Email ya registrado" });
    }

    // Hash password -> hash_contrasena
    const hashedPwd = await bcrypt.hash(password, 10);

    const userData = {
      nombre_usuario,
      correo,
      hash_contrasena: hashedPwd,
      nombre,
      apellido,
      id_rol: rolExist.id_rol,
      esta_activo: true,
    };

    const result = await createUserBasic(userData);

    if (result.error) {
      return res.status(500).json({ message: result.error.message });
    }

    return res.status(201).json({
      message: `Nuevo usuario ${result.data.nombre_usuario} creado exitosamente`,
      userId: result.data.id_usuario,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Listar usuarios (vía JWT, solo ADMINISTRADOR)
export const getAllUsersJWT = async (req, res) => {
  try {
    const result = await getAllUsersBasic();
    if (result.error) {
      return res.status(500).json({ message: result.error.message });
    }
    return res.json(result.data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Desactivar usuario (baja lógica, vía JWT, solo ADMINISTRADOR)
export const desactivarUsuarioJWT = async (req, res) => {
  try {
    const { id } = req.params; // id_usuario
    const result = await eliminarUsuario(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Activar usuario (vía JWT, solo ADMINISTRADOR)
export const activarUsuarioJWT = async (req, res) => {
  try {
    const { id } = req.params; // id_usuario
    const result = await activarUsuario(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
