// src/controllers/tipoAsignacionController.js
import { TipoAsignacionModel } from "../models/tipoAsignacionModel.js"

export const TipoAsignacionController = {
  async obtenerTipos(req, res) {
    try {
      const tipos = await TipoAsignacionModel.getAll()
      res.status(200).json(tipos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerTipoPorId(req, res) {
    try {
      const tipo = await TipoAsignacionModel.getById(req.params.id)
      if (!tipo) return res.status(404).json({ error: "Tipo de asignación no encontrado" })
      res.status(200).json(tipo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearTipo(req, res) {
    try {
      const { nombre_tipo, descripcion } = req.body
      if (!nombre_tipo) {
        return res.status(400).json({ error: "El nombre del tipo es obligatorio" })
      }

      const nuevoTipo = await TipoAsignacionModel.create({ nombre_tipo, descripcion })
      res.status(201).json(nuevoTipo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarTipo(req, res) {
    try {
      const { nombre_tipo, descripcion } = req.body
      const tipoActualizado = await TipoAsignacionModel.update(req.params.id, {
        nombre_tipo,
        descripcion,
      })
      res.status(200).json(tipoActualizado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarTipo(req, res) {
    try {
      const result = await TipoAsignacionModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
