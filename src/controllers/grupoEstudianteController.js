// src/controllers/grupoEstudianteController.js
import {
  getAllGruposEstudiante,
  createGrupoEstudiante,
  getGrupoById,
  updateGrupoEstudiante,
  desactivarGrupoEstudiante,
  countEstudiantesActivosPorGrupo,
} from "../models/grupoEstudianteModel.js";
import { getAllNivelesAcademicos } from "../models/nivelAcademicoModel.js";
import { registrarAuditoria } from "../models/auditoriaModel.js";

// Listar grupos
export const getGruposJWT = async (req, res) => {
  try {
    const { data, error } = await getAllGruposEstudiante();
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Niveles académicos
export const getNivelesAcademicosJWT = async (req, res) => {
  try {
    const { data, error } = await getAllNivelesAcademicos();
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DETALLE de grupo
export const getGrupoByIdJWT = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await getGrupoById(id);
    if (error || !data) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// CREAR grupo (CU3)
export const createGrupoJWT = async (req, res) => {
  try {
    const {
      nombre_grupo,
      id_nivel_academico,
      cantidad_estudiantes,
      requisitos_especiales,
    } = req.body;

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

    const cantidad = Number(cantidad_estudiantes);
    if (Number.isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({
        message:
          "El número de estudiantes debe ser un valor numérico mayor a cero",
      });
    }

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
    if (error) return res.status(400).json({ message: error.message });

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

// EDITAR grupo (CU4)
export const updateGrupoJWT = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: grupoActual, error: errorGrupo } = await getGrupoById(id);
    if (errorGrupo || !grupoActual) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    if (grupoActual.esta_activo === false) {
      return res.status(400).json({
        message: "No se puede editar un grupo inactivo",
      });
    }

    const {
      nombre_grupo,
      id_nivel_academico,
      cantidad_estudiantes,
      requisitos_especiales,
    } = req.body;

    const nuevosDatos = {};

    if (nombre_grupo !== undefined) nuevosDatos.nombre_grupo = nombre_grupo;
    if (id_nivel_academico !== undefined)
      nuevosDatos.id_nivel_academico = id_nivel_academico;
    if (cantidad_estudiantes !== undefined) {
      const cantidad = Number(cantidad_estudiantes);
      if (Number.isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).json({
          message:
            "El número de estudiantes debe ser un valor numérico mayor a cero",
        });
      }
      nuevosDatos.cantidad_estudiantes = cantidad;
    }
    if (requisitos_especiales !== undefined)
      nuevosDatos.requisitos_especiales = requisitos_especiales || null;

    if (Object.keys(nuevosDatos).length === 0) {
      return res.status(400).json({
        message: "No se recibieron campos para actualizar",
      });
    }

    const { data, error } = await updateGrupoEstudiante(id, nuevosDatos);
    if (error) return res.status(400).json({ message: error.message });

    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "EDITAR_GRUPO",
      tipo_entidad: "GRUPO_ESTUDIANTE",
      id_entidad: data.id_grupo,
      valores_antiguos: grupoActual,
      valores_nuevos: data,
    });

    return res.status(200).json({
      message: `Grupo ${data.nombre_grupo} actualizado correctamente`,
      grupo: data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// DESACTIVAR grupo (CU4)
export const desactivarGrupoJWT = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: grupoActual, error: errorGrupo } = await getGrupoById(id);
    if (errorGrupo || !grupoActual) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    if (grupoActual.esta_activo === false) {
      return res.status(400).json({
        message: "El grupo ya se encuentra inactivo",
      });
    }

    const { count, error: errorCount } =
      await countEstudiantesActivosPorGrupo(id);
    if (errorCount) {
      return res.status(500).json({ message: errorCount.message });
    }
    if (count > 0) {
      return res.status(400).json({
        message:
          "No se puede desactivar el grupo porque tiene estudiantes activos",
      });
    }

    const { data, error } = await desactivarGrupoEstudiante(id);
    if (error) return res.status(500).json({ message: error.message });

    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "DESACTIVAR_GRUPO",
      tipo_entidad: "GRUPO_ESTUDIANTE",
      id_entidad: data.id_grupo,
      valores_antiguos: grupoActual,
      valores_nuevos: data,
    });

    return res.status(200).json({
      message: `Grupo ${data.nombre_grupo} desactivado correctamente`,
      grupo: data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
