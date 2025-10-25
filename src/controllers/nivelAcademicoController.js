// src/controllers/nivelAcademicoController.js
import { NivelAcademicoModel } from "../models/nivelAcademicoModel.js"

export const NivelAcademicoController = {
  async obtenerNiveles(req, res) {
    try {
      const niveles = await NivelAcademicoModel.getAll()
      res.status(200).json(niveles)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerNivelPorId(req, res) {
    try {
      const nivel = await NivelAcademicoModel.getById(req.params.id)
      if (!nivel) return res.status(404).json({ error: "Nivel académico no encontrado" })
      res.status(200).json(nivel)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearNivel(req, res) {
    try {
      const { nombre_nivel, orden_nivel } = req.body
      if (!nombre_nivel || orden_nivel === undefined) {
        return res.status(400).json({ error: "Nombre y orden del nivel son obligatorios" })
      }

      const nuevoNivel = await NivelAcademicoModel.create({ nombre_nivel, orden_nivel })
      res.status(201).json(nuevoNivel)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarNivel(req, res) {
    try {
      const { nombre_nivel, orden_nivel } = req.body
      const nivelActualizado = await NivelAcademicoModel.update(req.params.id, {
        nombre_nivel,
        orden_nivel,
      })
      res.status(200).json(nivelActualizado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarNivel(req, res) {
    try {
      const result = await NivelAcademicoModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
