// src/controllers/recursoSalonController.js
import { RecursoSalonModel } from "../models/recursoSalonModel.js"

export const RecursoSalonController = {
  async obtenerRecursos(req, res) {
    try {
      const recursos = await RecursoSalonModel.getAll()
      res.status(200).json(recursos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerRecursoPorId(req, res) {
    try {
      const recurso = await RecursoSalonModel.getById(req.params.id)
      if (!recurso) return res.status(404).json({ error: "Recurso no encontrado" })
      res.status(200).json(recurso)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerRecursosPorSalon(req, res) {
    try {
      const recursos = await RecursoSalonModel.getBySalon(req.params.id_salon)
      res.status(200).json(recursos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearRecurso(req, res) {
    try {
      const { id_salon, id_tipo_recurso, cantidad, notas } = req.body
      if (!id_salon || !id_tipo_recurso || !cantidad) {
        return res.status(400).json({ error: "Salón, tipo de recurso y cantidad son obligatorios" })
      }

      const nuevoRecurso = await RecursoSalonModel.create({
        id_salon,
        id_tipo_recurso,
        cantidad,
        notas,
      })
      res.status(201).json(nuevoRecurso)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarRecurso(req, res) {
    try {
      const { cantidad, notas } = req.body
      const recursoActualizado = await RecursoSalonModel.update(req.params.id, {
        cantidad,
        notas,
      })
      res.status(200).json(recursoActualizado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarRecurso(req, res) {
    try {
      const result = await RecursoSalonModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
