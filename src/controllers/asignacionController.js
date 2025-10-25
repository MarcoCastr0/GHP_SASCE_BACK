// src/controllers/asignacionController.js
import { AsignacionModel } from "../models/asignacionModel.js"

export const AsignacionController = {
  async obtenerAsignaciones(req, res) {
    try {
      const asignaciones = await AsignacionModel.getAll()
      res.status(200).json(asignaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerAsignacionPorId(req, res) {
    try {
      const asignacion = await AsignacionModel.getById(req.params.id)
      if (!asignacion) return res.status(404).json({ error: "Asignación no encontrada" })
      res.status(200).json(asignacion)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerAsignacionesPorPeriodo(req, res) {
    try {
      const asignaciones = await AsignacionModel.getByPeriodo(req.params.id_periodo)
      res.status(200).json(asignaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerAsignacionesPorProfesor(req, res) {
    try {
      const asignaciones = await AsignacionModel.getByProfesor(req.params.id_profesor)
      res.status(200).json(asignaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerAsignacionesPorGrupo(req, res) {
    try {
      const asignaciones = await AsignacionModel.getByGrupo(req.params.id_grupo)
      res.status(200).json(asignaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerAsignacionesPorSalon(req, res) {
    try {
      const asignaciones = await AsignacionModel.getBySalon(req.params.id_salon)
      res.status(200).json(asignaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearAsignacion(req, res) {
    try {
      const {
        id_grupo,
        id_salon,
        id_profesor,
        id_periodo_academico,
        id_franja_horaria,
        id_tipo_asignacion,
        id_usuario_creador,
      } = req.body

      if (
        !id_grupo ||
        !id_salon ||
        !id_profesor ||
        !id_periodo_academico ||
        !id_franja_horaria ||
        !id_tipo_asignacion ||
        !id_usuario_creador
      ) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
      }

      const nuevaAsignacion = await AsignacionModel.create({
        id_grupo,
        id_salon,
        id_profesor,
        id_periodo_academico,
        id_franja_horaria,
        id_tipo_asignacion,
        id_usuario_creador,
      })
      res.status(201).json(nuevaAsignacion)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarAsignacion(req, res) {
    try {
      const { id_grupo, id_salon, id_profesor, id_franja_horaria } = req.body
      const asignacionActualizada = await AsignacionModel.update(req.params.id, {
        id_grupo,
        id_salon,
        id_profesor,
        id_franja_horaria,
      })
      res.status(200).json(asignacionActualizada)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarAsignacion(req, res) {
    try {
      const result = await AsignacionModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
