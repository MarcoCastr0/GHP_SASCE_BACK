// src/controllers/caracteristicaGrupoController.js
import { CaracteristicaGrupoModel } from "../models/caracteristicaGrupoModel.js"

export const CaracteristicaGrupoController = {
  async obtenerCaracteristicas(req, res) {
    try {
      const caracteristicas = await CaracteristicaGrupoModel.getAll()
      res.status(200).json(caracteristicas)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerCaracteristicaPorId(req, res) {
    try {
      const caracteristica = await CaracteristicaGrupoModel.getById(req.params.id)
      if (!caracteristica) return res.status(404).json({ error: "Característica no encontrada" })
      res.status(200).json(caracteristica)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerCaracteristicasPorGrupo(req, res) {
    try {
      const caracteristicas = await CaracteristicaGrupoModel.getByGrupo(req.params.id_grupo)
      res.status(200).json(caracteristicas)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearCaracteristica(req, res) {
    try {
      const { id_grupo, tipo_caracteristica, valor_caracteristica } = req.body
      if (!id_grupo || !tipo_caracteristica || !valor_caracteristica) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" })
      }

      const nuevaCaracteristica = await CaracteristicaGrupoModel.create({
        id_grupo,
        tipo_caracteristica,
        valor_caracteristica,
      })
      res.status(201).json(nuevaCaracteristica)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarCaracteristica(req, res) {
    try {
      const { tipo_caracteristica, valor_caracteristica } = req.body
      const caracteristicaActualizada = await CaracteristicaGrupoModel.update(req.params.id, {
        tipo_caracteristica,
        valor_caracteristica,
      })
      res.status(200).json(caracteristicaActualizada)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarCaracteristica(req, res) {
    try {
      const result = await CaracteristicaGrupoModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
