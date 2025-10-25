import {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../models/userModel.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postUsuario = async (req, res) => {
  try {
    const nuevo = await crearUsuario(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await actualizarUsuario(id, req.body);
    res.json(actualizado);
  } catch (error) {
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
