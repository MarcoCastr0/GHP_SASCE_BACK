import { disponibilidadProfesorModel } from "../models/disponibilidadProfesorModel.js";

export const disponibilidadProfesorController = {
  // =========================================
  // Obtener disponibilidad de un profesor
  // =========================================
  async getDisponibilidadProfesorJWT(req, res) {
    try {
      const { id_profesor } = req.params;
      const data = await disponibilidadProfesorModel.getByProfesorId(id_profesor);
      return res.json(data);
    } catch (error) {
      console.error("GET disponibilidad profesor:", error.message);
      return res.status(500).json({ message: "Error al obtener disponibilidad" });
    }
  },

  // =========================================
  // Crear nueva disponibilidad
  // =========================================
  async createDisponibilidadProfesorJWT(req, res) {
    try {
      const { id_profesor } = req.params;
      const { dia_semana, hora_inicio, hora_fin, id_periodo_academico, motivo } = req.body;

      // Validaciones obligatorias
      if (!id_periodo_academico || !dia_semana || !hora_inicio || !hora_fin || !motivo) {
        return res.status(400).json({
          message: "id_periodo_academico, dia_semana, hora_inicio, hora_fin y motivo son obligatorios"
        });
      }

      // Validación de horario
      if (hora_inicio >= hora_fin) {
        return res.status(400).json({
          message: "La hora de inicio no puede ser mayor o igual que la de fin"
        });
      }

      // Validar solapamiento con otras disponibilidades
      const conflictoDisponibilidad = await disponibilidadProfesorModel.verificarConflictoDisponibilidad(
        id_profesor, dia_semana, hora_inicio, hora_fin
      );

      if (conflictoDisponibilidad) {
        return res.status(409).json({
          message: "Conflicto con otra disponibilidad del profesor"
        });
      }

      // Validar conflicto con asignaciones
      const conflictoAsignacion = await disponibilidadProfesorModel.verificarConflictoAsignaciones(
        id_profesor, dia_semana, hora_inicio, hora_fin
      );

      if (conflictoAsignacion) {
        return res.status(409).json({
          message: "Conflicto con una asignación del profesor"
        });
      }

      // Crear disponibilidad
      const nueva = await disponibilidadProfesorModel.createDisponibilidad({
        id_profesor,
        id_periodo_academico,
        dia_semana,
        hora_inicio,
        hora_fin,
        motivo,
      });

      return res.status(201).json(nueva);

    } catch (error) {
      console.error("POST disponibilidad profesor:", error.message);
      return res.status(500).json({ message: "Error al crear disponibilidad" });
    }
  },

  // =========================================
  // Actualizar disponibilidad
  // =========================================
  async updateDisponibilidadProfesorJWT(req, res) {
    try {
      // Convertir ID a número
      const id_ocupacion = parseInt(req.params.id, 10);
      if (isNaN(id_ocupacion)) {
        return res.status(400).json({ message: "ID de ocupación inválido" });
      }

      const { dia_semana, hora_inicio, hora_fin, motivo } = req.body;

      // Validar campos obligatorios
      if (!dia_semana || !hora_inicio || !hora_fin || !motivo) {
        return res.status(400).json({
          message: "dia_semana, hora_inicio, hora_fin y motivo son obligatorios"
        });
      }

      // Validar horario
      if (hora_inicio >= hora_fin) {
        return res.status(400).json({
          message: "La hora de inicio no puede ser mayor o igual que la de fin"
        });
      }

      // Obtener registro original
      const registroOriginal = await disponibilidadProfesorModel.getById(id_ocupacion);
      if (!registroOriginal) {
        return res.status(404).json({ message: "Disponibilidad no encontrada" });
      }

      const id_profesor = registroOriginal.id_profesor;

      // Validar conflictos con otras disponibilidades (excluyendo el registro actual)
      const conflictoDisponibilidad = await disponibilidadProfesorModel.verificarConflictoDisponibilidad(
        id_profesor,
        dia_semana,
        hora_inicio,
        hora_fin,
        id_ocupacion
      );

      if (conflictoDisponibilidad) {
        return res.status(409).json({ message: "Conflicto con otra disponibilidad del profesor" });
      }

      // Validar conflictos con asignaciones (excluyendo el registro actual)
      const conflictoAsignacion = await disponibilidadProfesorModel.verificarConflictoAsignaciones(
        id_profesor,
        dia_semana,
        hora_inicio,
        hora_fin,
        id_ocupacion
      );

      if (conflictoAsignacion) {
        return res.status(409).json({ message: "Conflicto con una asignación del profesor" });
      }

      // Actualizar disponibilidad
      const actualizada = await disponibilidadProfesorModel.updateDisponibilidad(id_ocupacion, {
        dia_semana,
        hora_inicio,
        hora_fin,
        motivo
      });

      return res.json(actualizada);

    } catch (error) {
      console.error("PUT disponibilidad profesor:", error.message);
      return res.status(500).json({ message: "Error al actualizar disponibilidad" });
    }
},


  // =========================================
  // Eliminar disponibilidad
  // =========================================
  async deleteDisponibilidadProfesorJWT(req, res) {
    try {
      const { id } = req.params;
      await disponibilidadProfesorModel.delete(id);
      return res.json({ message: "Disponibilidad eliminada correctamente" });
    } catch (error) {
      console.error("DELETE disponibilidad profesor:", error.message);
      return res.status(500).json({ message: "Error al eliminar disponibilidad" });
    }
  }
};
