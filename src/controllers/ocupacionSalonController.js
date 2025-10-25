// src/controllers/ocupacionSalonController.js
import { OcupacionSalonModel } from "../models/ocupacionSalonModel.js"

export const OcupacionSalonController = {
  async obtenerOcupaciones(req, res) {
    try {
      const ocupaciones = await OcupacionSalonModel.getAll()
      res.status(200).json(ocupaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerOcupacionPorId(req, res) {
    try {
      const ocupacion = await OcupacionSalonModel.getById(req.params.id)
      if (!ocupacion) return res.status(404).json({ error: "Ocupación no encontrada" })
      res.status(200).json(ocupacion)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerOcupacionesPorSalon(req, res) {
    try {
      const ocupaciones = await OcupacionSalonModel.getBySalon(req.params.id_salon)
      res.status(200).json(ocupaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerOcupacionesPorSalonYPeriodo(req, res) {
    try {
      const { id_salon, id_periodo } = req.params
      const ocupaciones = await OcupacionSalonModel.getBySalonYPeriodo(id_salon, id_periodo)
      res.status(200).json(ocupaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearOcupacion(req, res) {
    try {
      const { id_salon, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo } = req.body
      if (!id_salon || !id_periodo_academico || dia_semana === undefined || !hora_inicio || !hora_fin || !motivo) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
      }

      const nuevaOcupacion = await OcupacionSalonModel.create({
        id_salon,
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
      const ocupacionActualizada = await OcupacionSalonModel.update(req.params.id, {
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
      const result = await OcupacionSalonModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
