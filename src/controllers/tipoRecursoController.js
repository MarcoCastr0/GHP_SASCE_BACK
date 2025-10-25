// src/controllers/tipoRecursoController.js
import { TipoRecursoModel } from "../models/tipoRecursoModel.js"

export const TipoRecursoController = {
  async obtenerTiposRecurso(req, res) {
    try {
      const tipos = await TipoRecursoModel.getAll()
      res.status(200).json(tipos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerTipoRecursoPorId(req, res) {
    try {
      const tipo = await TipoRecursoModel.getById(req.params.id)
      if (!tipo) return res.status(404).json({ error: "Tipo de recurso no encontrado" })
      res.status(200).json(tipo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearTipoRecurso(req, res) {
    try {
      const { nombre_recurso, descripcion } = req.body
      if (!nombre_recurso) {
        return res.status(400).json({ error: "El nombre del recurso es obligatorio" })
      }

      const nuevoTipo = await TipoRecursoModel.create({ nombre_recurso, descripcion })
      res.status(201).json(nuevoTipo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarTipoRecurso(req, res) {
    try {
      const { nombre_recurso, descripcion } = req.body
      const tipoActualizado = await TipoRecursoModel.update(req.params.id, {
        nombre_recurso,
        descripcion,
      })
      res.status(200).json(tipoActualizado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarTipoRecurso(req, res) {
    try {
      const result = await TipoRecursoModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
