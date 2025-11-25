// src/controllers/userController.js
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  activarUsuario,
} from "../models/userModel.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsuarioPorId = async (req, res) => {
  try {
    const usuario = await obtenerUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postUsuario = async (req, res) => {
  try {
    const { nombre_usuario, correo, hash_contrasena, nombre, apellido, id_rol } = req.body;
    
    // Validaciones básicas
    if (!nombre_usuario || !correo || !hash_contrasena || !nombre || !apellido || !id_rol) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevoUsuario = await crearUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    if (error.message.includes("ya está registrado") || error.message.includes("ya está en uso")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const putUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await actualizarUsuario(id, req.body);
    res.json(actualizado);
  } catch (error) {
    if (error.message.includes("ya está registrado") || error.message.includes("ya está en uso")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await eliminarUsuario(id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const activateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await activarUsuario(id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};