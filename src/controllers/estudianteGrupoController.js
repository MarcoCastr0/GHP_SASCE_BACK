// src/controllers/estudianteGrupoController.js
import { EstudianteGrupoModel } from "../models/estudianteGrupoModel.js"

export const EstudianteGrupoController = {
  async obtenerMatriculas(req, res) {
    try {
      const matriculas = await EstudianteGrupoModel.getAll()
      res.status(200).json(matriculas)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerMatriculaPorId(req, res) {
    try {
      const matricula = await EstudianteGrupoModel.getById(req.params.id)
      if (!matricula) return res.status(404).json({ error: "Matrícula no encontrada" })
      res.status(200).json(matricula)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerMatriculasPorEstudiante(req, res) {
    try {
      const matriculas = await EstudianteGrupoModel.getByEstudiante(req.params.id_estudiante)
      res.status(200).json(matriculas)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerMatriculasPorGrupo(req, res) {
    try {
      const matriculas = await EstudianteGrupoModel.getByGrupo(req.params.id_grupo)
      res.status(200).json(matriculas)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async obtenerMatriculasPorGrupoYPeriodo(req, res) {
    try {
      const { id_grupo, id_periodo } = req.params
      const matriculas = await EstudianteGrupoModel.getByGrupoYPeriodo(id_grupo, id_periodo)
      res.status(200).json(matriculas)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async crearMatricula(req, res) {
    try {
      const { id_estudiante, id_grupo, id_periodo_academico, fecha_inscripcion, estado_inscripcion } = req.body
      if (!id_estudiante || !id_grupo || !id_periodo_academico) {
        return res.status(400).json({ error: "Estudiante, grupo y período son obligatorios" })
      }

      const nuevaMatricula = await EstudianteGrupoModel.create({
        id_estudiante,
        id_grupo,
        id_periodo_academico,
        fecha_inscripcion: fecha_inscripcion || new Date().toISOString().split("T")[0],
        estado_inscripcion: estado_inscripcion || "ACTIVO",
      })
      res.status(201).json(nuevaMatricula)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async actualizarMatricula(req, res) {
    try {
      const { fecha_retiro, estado_inscripcion, esta_activo } = req.body
      const matriculaActualizada = await EstudianteGrupoModel.update(req.params.id, {
        fecha_retiro,
        estado_inscripcion,
        esta_activo,
      })
      res.status(200).json(matriculaActualizada)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async eliminarMatricula(req, res) {
    try {
      const result = await EstudianteGrupoModel.remove(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
