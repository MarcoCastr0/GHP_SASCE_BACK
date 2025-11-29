// src/controllers/grupoEstudianteController.js
import {
  getAllGruposEstudiante,
  createGrupoEstudiante,
} from "../models/grupoEstudianteModel.js";
import { getAllNivelesAcademicos } from "../models/nivelAcademicoModel.js";
import { registrarAuditoria } from "../models/auditoriaModel.js";

// Listar grupos de estudiantes (solo coordinador/admin)
export const getGruposJWT = async (req, res) => {
  try {
    const { data, error } = await getAllGruposEstudiante();
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Obtener niveles académicos (para combos)
export const getNivelesAcademicosJWT = async (req, res) => {
  try {
    const { data, error } = await getAllNivelesAcademicos();
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Registrar nuevo grupo de estudiantes (CU3)
export const createGrupoJWT = async (req, res) => {
  try {
    const {
      nombre_grupo,
      id_nivel_academico,
      cantidad_estudiantes,
      requisitos_especiales,
    } = req.body;

    // Validación básica de campos obligatorios
    if (
      !nombre_grupo ||
      !id_nivel_academico ||
      cantidad_estudiantes === undefined
    ) {
      return res.status(400).json({
        message:
          "Campos obligatorios: nombre_grupo, id_nivel_academico, cantidad_estudiantes",
      });
    }

    // Validar cantidad_estudiantes > 0 y numérico
    const cantidad = Number(cantidad_estudiantes);
    if (Number.isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({
        message: "El número de estudiantes debe ser un valor numérico mayor a cero",
      });
    }

    // Generar un código de grupo simple (puedes cambiar la lógica)
    const codigo_grupo = `GRP-${Date.now()}`;

    const grupoData = {
      nombre_grupo,
      codigo_grupo,
      id_nivel_academico,
      cantidad_estudiantes: cantidad,
      requisitos_especiales: requisitos_especiales || null,
      esta_activo: true,
    };

    const { data, error } = await createGrupoEstudiante(grupoData);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Registrar auditoría
    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "CREAR_GRUPO",
      tipo_entidad: "GRUPO_ESTUDIANTE",
      id_entidad: data.id_grupo,
      valores_nuevos: {
        nombre_grupo: data.nombre_grupo,
        id_nivel_academico: data.id_nivel_academico,
        cantidad_estudiantes: data.cantidad_estudiantes,
      },
    });

    return res.status(201).json({
      message: `Grupo ${data.nombre_grupo} creado exitosamente`,
      grupo: data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
