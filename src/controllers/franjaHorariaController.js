// src/controllers/franjaHorariaController.js
import { FranjaHorariaModel } from "../models/franjaHorariaModel.js"

export const FranjaHorariaController = {
  async obtenerFranjas(req, res) {
    try {
      const franjas = await FranjaHorariaModel.getAll()
      res.status(200).json(franjas)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerFranjaPorId(req, res) {
    try {
      const franja = await FranjaHorariaModel.getById(req.params.id)
      if (!franja) return res.status(404).json({ error: "Franja horaria no encontrada" })
      res.status(200).json(franja)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerFranjasPorDia(req, res) {
    try {
      const franjas = await FranjaHorariaModel.getByDia(req.params.dia_semana)
      res.status(200).json(franjas)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearFranja(req, res) {
    try {
      const { dia_semana, hora_inicio, hora_fin, duracion_minutos } = req.body
      if (dia_semana === undefined || !hora_inicio || !hora_fin || !duracion_minutos) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
      }

      const nuevaFranja = await FranjaHorariaModel.create({
        dia_semana,
        hora_inicio,
        hora_fin,
        duracion_minutos,
      })
      res.status(201).json(nuevaFranja)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarFranja(req, res) {
    try {
      const { dia_semana, hora_inicio, hora_fin, duracion_minutos } = req.body
      const franjaActualizada = await FranjaHorariaModel.update(req.params.id, {
        dia_semana,
        hora_inicio,
        hora_fin,
        duracion_minutos,
      })
      res.status(200).json(franjaActualizada)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarFranja(req, res) {
    try {
      const result = await FranjaHorariaModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
