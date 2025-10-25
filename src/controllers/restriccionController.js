// src/controllers/restriccionController.js
import { RestriccionModel } from "../models/restriccionModel.js"

export const RestriccionController = {
  async obtenerRestricciones(req, res) {
    try {
      const restricciones = await RestriccionModel.getAll()
      res.status(200).json(restricciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerRestriccionPorId(req, res) {
    try {
      const restriccion = await RestriccionModel.getById(req.params.id)
      if (!restriccion) return res.status(404).json({ error: "Restricción no encontrada" })
      res.status(200).json(restriccion)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerRestriccionesPorRecurso(req, res) {
    try {
      const { tipo_recurso, id_recurso } = req.params
      const restricciones = await RestriccionModel.getByRecurso(tipo_recurso, id_recurso)
      res.status(200).json(restricciones)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearRestriccion(req, res) {
    try {
      const { tipo_restriccion, id_recurso, tipo_recurso, descripcion_restriccion, valido_desde, valido_hasta } =
        req.body

      if (!tipo_restriccion || !id_recurso || !tipo_recurso || !descripcion_restriccion) {
        return res.status(400).json({ error: "Campos obligatorios faltantes" })
      }

      const nuevaRestriccion = await RestriccionModel.create({
        tipo_restriccion,
        id_recurso,
        tipo_recurso,
        descripcion_restriccion,
        valido_desde,
        valido_hasta,
      })
      res.status(201).json(nuevaRestriccion)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarRestriccion(req, res) {
    try {
      const { tipo_restriccion, descripcion_restriccion, valido_desde, valido_hasta, esta_activo } = req.body
      const restriccionActualizada = await RestriccionModel.update(req.params.id, {
        tipo_restriccion,
        descripcion_restriccion,
        valido_desde,
        valido_hasta,
        esta_activo,
      })
      res.status(200).json(restriccionActualizada)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarRestriccion(req, res) {
    try {
      const result = await RestriccionModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
