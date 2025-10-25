// src/controllers/salonController.js
import { SalonModel } from "../models/salonModel.js"

export const SalonController = {
  async obtenerSalones(req, res) {
    try {
      const salones = await SalonModel.getAll()
      res.status(200).json(salones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerSalonPorId(req, res) {
    try {
      const salon = await SalonModel.getById(req.params.id)
      if (!salon) return res.status(404).json({ error: "Salón no encontrado" })
      res.status(200).json(salon)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerSalonesPorEdificio(req, res) {
    try {
      const salones = await SalonModel.getByEdificio(req.params.id_edificio)
      res.status(200).json(salones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerSalonesPorCapacidad(req, res) {
    try {
      const { capacidad_minima } = req.query
      if (!capacidad_minima) {
        return res.status(400).json({ error: "Capacidad mínima es requerida" })
      }
      const salones = await SalonModel.getByCapacidadMinima(Number.parseInt(capacidad_minima))
      res.status(200).json(salones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearSalon(req, res) {
    try {
      const { codigo_salon, nombre_salon, id_edificio, numero_piso, capacidad, descripcion_ubicacion } = req.body
      if (!codigo_salon || !id_edificio || !capacidad) {
        return res.status(400).json({ error: "Código, edificio y capacidad son obligatorios" })
      }

      const nuevoSalon = await SalonModel.create({
        codigo_salon,
        nombre_salon,
        id_edificio,
        numero_piso,
        capacidad,
        descripcion_ubicacion,
      })
      res.status(201).json(nuevoSalon)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarSalon(req, res) {
    try {
      const { codigo_salon, nombre_salon, id_edificio, numero_piso, capacidad, descripcion_ubicacion, esta_activo } =
        req.body
      const salonActualizado = await SalonModel.update(req.params.id, {
        codigo_salon,
        nombre_salon,
        id_edificio,
        numero_piso,
        capacidad,
        descripcion_ubicacion,
        esta_activo,
      })
      res.status(200).json(salonActualizado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarSalon(req, res) {
    try {
      const result = await SalonModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
