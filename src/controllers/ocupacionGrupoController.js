// src/controllers/ocupacionGrupoController.js
import { OcupacionGrupoModel } from "../models/ocupacionGrupoModel.js"

export const OcupacionGrupoController = {
  async obtenerOcupaciones(req, res) {
    try {
      const ocupaciones = await OcupacionGrupoModel.getAll()
      res.status(200).json(ocupaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerOcupacionPorId(req, res) {
    try {
      const ocupacion = await OcupacionGrupoModel.getById(req.params.id)
      if (!ocupacion) return res.status(404).json({ error: "Ocupación no encontrada" })
      res.status(200).json(ocupacion)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerOcupacionesPorGrupo(req, res) {
    try {
      const ocupaciones = await OcupacionGrupoModel.getByGrupo(req.params.id_grupo)
      res.status(200).json(ocupaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerOcupacionesPorGrupoYPeriodo(req, res) {
    try {
      const { id_grupo, id_periodo } = req.params
      const ocupaciones = await OcupacionGrupoModel.getByGrupoYPeriodo(id_grupo, id_periodo)
      res.status(200).json(ocupaciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearOcupacion(req, res) {
    try {
      const { id_grupo, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo } = req.body
      if (!id_grupo || !id_periodo_academico || dia_semana === undefined || !hora_inicio || !hora_fin || !motivo) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
      }

      const nuevaOcupacion = await OcupacionGrupoModel.create({
        id_grupo,
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
      const ocupacionActualizada = await OcupacionGrupoModel.update(req.params.id, {
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
      const result = await OcupacionGrupoModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
