// src/controllers/ocupacionProfesorController.js
import { OcupacionProfesorModel } from "../models/ocupacionProfesorModel.js"

export const OcupacionProfesorController = {
  async obtenerOcupaciones(req, res) {
    try {
      const ocupaciones = await OcupacionProfesorModel.getAll()
      res.status(200).json(ocupaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerOcupacionPorId(req, res) {
    try {
      const ocupacion = await OcupacionProfesorModel.getById(req.params.id)
      if (!ocupacion) return res.status(404).json({ error: "Ocupación no encontrada" })
      res.status(200).json(ocupacion)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerOcupacionesPorProfesor(req, res) {
    try {
      const ocupaciones = await OcupacionProfesorModel.getByProfesor(req.params.id_profesor)
      res.status(200).json(ocupaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerOcupacionesPorProfesorYPeriodo(req, res) {
    try {
      const { id_profesor, id_periodo } = req.params
      const ocupaciones = await OcupacionProfesorModel.getByProfesorYPeriodo(id_profesor, id_periodo)
      res.status(200).json(ocupaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearOcupacion(req, res) {
    try {
      const { id_profesor, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo } = req.body
      if (!id_profesor || !id_periodo_academico || dia_semana === undefined || !hora_inicio || !hora_fin || !motivo) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
      }

      const nuevaOcupacion = await OcupacionProfesorModel.create({
        id_profesor,
        id_periodo_academico,
        dia_semana,
        hora_inicio,
        hora_fin,
        motivo,
      })
      res.status(201).json(nuevaOcupacion)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarOcupacion(req, res) {
    try {
      const { dia_semana, hora_inicio, hora_fin, motivo } = req.body
      const ocupacionActualizada = await OcupacionProfesorModel.update(req.params.id, {
        dia_semana,
        hora_inicio,
        hora_fin,
        motivo,
      })
      res.status(200).json(ocupacionActualizada)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarOcupacion(req, res) {
    try {
      const result = await OcupacionProfesorModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
