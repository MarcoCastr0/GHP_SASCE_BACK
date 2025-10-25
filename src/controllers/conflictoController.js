// src/controllers/conflictoController.js
import { ConflictoModel } from "../models/conflictoModel.js"

export const ConflictoController = {
  async obtenerConflictos(req, res) {
    try {
      const conflictos = await ConflictoModel.getAll()
      res.status(200).json(conflictos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerConflictoPorId(req, res) {
    try {
      const conflicto = await ConflictoModel.getById(req.params.id)
      if (!conflicto) return res.status(404).json({ error: "Conflicto no encontrado" })
      res.status(200).json(conflicto)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerConflictosPorAsignacion(req, res) {
    try {
      const conflictos = await ConflictoModel.getByAsignacion(req.params.id_asignacion)
      res.status(200).json(conflictos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerConflictosNoResueltos(req, res) {
    try {
      const conflictos = await ConflictoModel.getNoResueltos()
      res.status(200).json(conflictos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerConflictosPorSeveridad(req, res) {
    try {
      const conflictos = await ConflictoModel.getBySeveridad(req.params.severidad)
      res.status(200).json(conflictos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearConflicto(req, res) {
    try {
      const { id_asignacion, tipo_conflicto, descripcion_conflicto, severidad } = req.body

      if (!id_asignacion || !tipo_conflicto || !descripcion_conflicto || !severidad) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
      }

      const nuevoConflicto = await ConflictoModel.create({
        id_asignacion,
        tipo_conflicto,
        descripcion_conflicto,
        severidad,
      })
      res.status(201).json(nuevoConflicto)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarConflicto(req, res) {
    try {
      const { tipo_conflicto, descripcion_conflicto, severidad, esta_resuelto, resuelto_en } = req.body
      const conflictoActualizado = await ConflictoModel.update(req.params.id, {
        tipo_conflicto,
        descripcion_conflicto,
        severidad,
        esta_resuelto,
        resuelto_en,
      })
      res.status(200).json(conflictoActualizado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async marcarResuelto(req, res) {
    try {
      const conflictoResuelto = await ConflictoModel.marcarResuelto(req.params.id)
      res.status(200).json(conflictoResuelto)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarConflicto(req, res) {
    try {
      const result = await ConflictoModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
