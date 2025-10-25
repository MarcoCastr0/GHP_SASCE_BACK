// src/controllers/registroAuditoriaController.js
import { RegistroAuditoriaModel } from "../models/registroAuditoriaModel.js"

export const RegistroAuditoriaController = {
  async obtenerRegistros(req, res) {
    try {
      const { limit } = req.query
      const registros = await RegistroAuditoriaModel.getAll(limit ? Number.parseInt(limit) : 100)
      res.status(200).json(registros)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerRegistroPorId(req, res) {
    try {
      const registro = await RegistroAuditoriaModel.getById(req.params.id)
      if (!registro) return res.status(404).json({ error: "Registro no encontrado" })
      res.status(200).json(registro)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerRegistrosPorUsuario(req, res) {
    try {
      const { limit } = req.query
      const registros = await RegistroAuditoriaModel.getByUsuario(
        req.params.id_usuario,
        limit ? Number.parseInt(limit) : 50,
      )
      res.status(200).json(registros)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerRegistrosPorEntidad(req, res) {
    try {
      const { tipo_entidad, id_entidad } = req.params
      const registros = await RegistroAuditoriaModel.getByEntidad(tipo_entidad, id_entidad)
      res.status(200).json(registros)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerRegistrosPorAccion(req, res) {
    try {
      const { limit } = req.query
      const registros = await RegistroAuditoriaModel.getByAccion(
        req.params.tipo_accion,
        limit ? Number.parseInt(limit) : 100,
      )
      res.status(200).json(registros)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearRegistro(req, res) {
    try {
      const { id_usuario, tipo_accion, tipo_entidad, id_entidad, valores_antiguos, valores_nuevos } = req.body

      if (!id_usuario || !tipo_accion || !tipo_entidad || id_entidad === undefined) {
        return res.status(400).json({ error: "Campos obligatorios faltantes" })
      }

      const nuevoRegistro = await RegistroAuditoriaModel.create({
        id_usuario,
        tipo_accion,
        tipo_entidad,
        id_entidad,
        valores_antiguos,
        valores_nuevos,
      })
      res.status(201).json(nuevoRegistro)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
