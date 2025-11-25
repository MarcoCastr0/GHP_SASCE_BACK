// src/controllers/rolController.js
import { RolModel } from "../models/rolModel.js";

export const obtenerRoles = async (req, res) => {
  try {
    const roles = await RolModel.getAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerRolPorId = async (req, res) => {
  try {
    const rol = await RolModel.getById(req.params.id);
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearRol = async (req, res) => {
  try {
    const { nombre_rol, descripcion } = req.body;
    
    if (!nombre_rol) {
      return res.status(400).json({ error: "El nombre del rol es obligatorio" });
    }

    const nuevoRol = await RolModel.create({ nombre_rol, descripcion });
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarRol = async (req, res) => {
  try {
    const { nombre_rol, descripcion } = req.body;
    const rolActualizado = await RolModel.update(req.params.id, {
      nombre_rol,
      descripcion,
    });
    res.status(200).json(rolActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarRol = async (req, res) => {
  try {
    const result = await RolModel.remove(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};