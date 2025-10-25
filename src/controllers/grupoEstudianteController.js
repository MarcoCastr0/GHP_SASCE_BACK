// src/controllers/grupoEstudianteController.js
import { GrupoEstudianteModel } from "../models/grupoEstudianteModel.js"

export const GrupoEstudianteController = {
  async obtenerGrupos(req, res) {
    try {
      const grupos = await GrupoEstudianteModel.getAll()
      res.status(200).json(grupos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerGrupoPorId(req, res) {
    try {
      const grupo = await GrupoEstudianteModel.getById(req.params.id)
      if (!grupo) return res.status(404).json({ error: "Grupo no encontrado" })
      res.status(200).json(grupo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerGruposPorNivel(req, res) {
    try {
      const grupos = await GrupoEstudianteModel.getByNivel(req.params.id_nivel)
      res.status(200).json(grupos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearGrupo(req, res) {
    try {
      const { nombre_grupo, codigo_grupo, id_nivel_academico, cantidad_estudiantes, requisitos_especiales } = req.body
      if (!nombre_grupo || !codigo_grupo || !id_nivel_academico || !cantidad_estudiantes) {
        return res.status(400).json({ error: "Campos obligatorios faltantes" })
      }

      const nuevoGrupo = await GrupoEstudianteModel.create({
        nombre_grupo,
        codigo_grupo,
        id_nivel_academico,
        cantidad_estudiantes,
        requisitos_especiales,
      })
      res.status(201).json(nuevoGrupo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarGrupo(req, res) {
    try {
      const {
        nombre_grupo,
        codigo_grupo,
        id_nivel_academico,
        cantidad_estudiantes,
        requisitos_especiales,
        esta_activo,
      } = req.body
      const grupoActualizado = await GrupoEstudianteModel.update(req.params.id, {
        nombre_grupo,
        codigo_grupo,
        id_nivel_academico,
        cantidad_estudiantes,
        requisitos_especiales,
        esta_activo,
      })
      res.status(200).json(grupoActualizado)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarGrupo(req, res) {
    try {
      const result = await GrupoEstudianteModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
