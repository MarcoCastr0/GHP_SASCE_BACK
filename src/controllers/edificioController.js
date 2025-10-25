// src/controllers/edificioController.js
import { EdificioModel } from "../models/edificioModel.js"

export const EdificioController = {
  async obtenerEdificios(req, res) {
    try {
      const edificios = await EdificioModel.getAll()
      res.status(200).json(edificios)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerEdificioPorId(req, res) {
    try {
      const edificio = await EdificioModel.getById(req.params.id)
      if (!edificio) return res.status(404).json({ error: "Edificio no encontrado" })
      res.status(200).json(edificio)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearEdificio(req, res) {
    try {
      const { nombre_edificio, codigo_edificio, direccion } = req.body
      if (!nombre_edificio || !codigo_edificio) {
        return res.status(400).json({ error: "Nombre y código del edificio son obligatorios" })
      }

      const nuevoEdificio = await EdificioModel.create({
        nombre_edificio,
        codigo_edificio,
        direccion,
      })
      res.status(201).json(nuevoEdificio)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarEdificio(req, res) {
    try {
      const { nombre_edificio, codigo_edificio, direccion } = req.body
      const edificioActualizado = await EdificioModel.update(req.params.id, {
        nombre_edificio,
        codigo_edificio,
        direccion,
      })
      res.status(200).json(edificioActualizado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarEdificio(req, res) {
    try {
      const result = await EdificioModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
