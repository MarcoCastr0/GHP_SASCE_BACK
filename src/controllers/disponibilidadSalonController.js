// src/controllers/disponibilidadSalonController.js
import {
  getOcupacionesSalon,
  createOcupacionSalon,
  deleteOcupacionSalon,
  checkConflictosOcupacion,
  checkConflictosAsignacion,
} from "../models/ocupacionSalonModel.js";
import { getGrupoById } from "../models/grupoEstudianteModel.js"; // para validar que el salón existe (opcional, o usar salonModel)
import { registrarAuditoria } from "../models/auditoriaModel.js";

// Obtener ocupaciones de un salón
export const getOcupacionesSalonJWT = async (req, res) => {
  try {
    const { id } = req.params; // id_salon
    const { id_periodo_academico, dia_semana } = req.query;

    const filtros = {};
    if (id_periodo_academico) {
      filtros.id_periodo_academico = parseInt(id_periodo_academico, 10);
    }
    if (dia_semana !== undefined) {
      filtros.dia_semana = parseInt(dia_semana, 10);
    }

    const { data, error } = await getOcupacionesSalon(id, filtros);
    if (error) return res.status(500).json({ message: error.message });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Crear nueva ocupación (bloqueo de horario)
export const createOcupacionSalonJWT = async (req, res) => {
  try {
    const { id } = req.params; // id_salon
    const { id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo } =
      req.body;

    // Validaciones de campos obligatorios
    if (
      id_periodo_academico === undefined ||
      dia_semana === undefined ||
      !hora_inicio ||
      !hora_fin ||
      !motivo
    ) {
      return res.status(400).json({
        message:
          "Campos obligatorios: id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo",
      });
    }

    // Validar dia_semana (0-6)
    const dia = parseInt(dia_semana, 10);
    if (dia < 0 || dia > 6) {
      return res.status(400).json({
        message: "El día de la semana debe estar entre 0 (domingo) y 6 (sábado)",
      });
    }

    // Validar que hora_fin > hora_inicio
    if (hora_fin <= hora_inicio) {
      return res.status(400).json({
        message: "La hora de fin debe ser posterior a la hora de inicio",
      });
    }

    // Validar rango de operación (opcional, ejemplo 06:00 - 22:00)
    const horaInicioStr = hora_inicio.substring(0, 5); // HH:MM
    const horaFinStr = hora_fin.substring(0, 5);
    if (horaInicioStr < "06:00" || horaFinStr > "22:00") {
      return res.status(400).json({
        message:
          "El horario debe estar dentro del rango de operación (06:00 - 22:00)",
      });
    }

    // Verificar conflictos con otras ocupaciones
    const { conflictos: conflictosOcup, error: errorOcup } =
      await checkConflictosOcupacion({
        id_salon: id,
        id_periodo_academico,
        dia_semana: dia,
        hora_inicio,
        hora_fin,
      });

    if (errorOcup) {
      return res.status(500).json({ message: errorOcup.message });
    }

    if (conflictosOcup.length > 0) {
      return res.status(400).json({
        message:
          "Ya existe una ocupación en el rango horario seleccionado para este salón",
        conflictos: conflictosOcup,
      });
    }

    // Verificar conflictos con asignaciones existentes
    const { conflictos: conflictosAsig, error: errorAsig } =
      await checkConflictosAsignacion({
        id_salon: id,
        id_periodo_academico,
        dia_semana: dia,
        hora_inicio,
        hora_fin,
      });

    if (errorAsig) {
      return res.status(500).json({ message: errorAsig.message });
    }

    if (conflictosAsig.length > 0) {
      return res.status(400).json({
        message:
          "Ya existe una asignación (clase programada) en el rango horario seleccionado para este salón",
        conflictos: conflictosAsig,
      });
    }

    // Si no hay conflictos, crear la ocupación
    const ocupacionData = {
      id_salon: parseInt(id, 10),
      id_periodo_academico: parseInt(id_periodo_academico, 10),
      dia_semana: dia,
      hora_inicio,
      hora_fin,
      motivo,
    };

    const { data, error } = await createOcupacionSalon(ocupacionData);
    if (error) return res.status(500).json({ message: error.message });

    // Auditoría
    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "CREAR_OCUPACION_SALON",
      tipo_entidad: "OCUPACION_SALON",
      id_entidad: data.id_ocupacion,
      valores_nuevos: data,
    });

    return res.status(201).json({
      message: "Ocupación registrada correctamente",
      ocupacion: data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Eliminar una ocupación
export const deleteOcupacionSalonJWT = async (req, res) => {
  try {
    const { id_ocupacion } = req.params;

    const { data, error } = await deleteOcupacionSalon(id_ocupacion);

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ message: "Ocupación no encontrada" });
      }
      return res.status(500).json({ message: error.message });
    }

    // Auditoría
    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "ELIMINAR_OCUPACION_SALON",
      tipo_entidad: "OCUPACION_SALON",
      id_entidad: parseInt(id_ocupacion, 10),
      valores_antiguos: data,
    });

    return res.status(200).json({
      message: "Ocupación eliminada correctamente",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
