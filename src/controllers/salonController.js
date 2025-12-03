// src/controllers/salonController.js
import {
  getAllSalones,
  getSalonById,
  createSalon,
  updateSalon,
  desactivarSalon,
  countAsignacionesActivasPorSalon,
  createRecursosSalon,
  deleteRecursosBySalon,
} from "../models/salonModel.js";
import { getAllEdificios } from "../models/edificioModel.js";
import { getAllTiposRecurso } from "../models/tipoRecursoModel.js";
import { getAllPeriodosAcademicos } from "../models/periodoAcademicoModel.js";
import { registrarAuditoria } from "../models/auditoriaModel.js";

// Listar salones (para vista principal)
export const getSalonesJWT = async (req, res) => {
  try {
    const { data, error } = await getAllSalones();
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Ver detalle de un salón
export const getSalonByIdJWT = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await getSalonById(id);
    if (error || !data) {
      return res.status(404).json({ message: "Salón no encontrado" });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Obtener edificios (para combo)
export const getEdificiosJWT = async (req, res) => {
  try {
    const { data, error } = await getAllEdificios();
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Obtener tipos de recurso (para combo)
export const getTiposRecursoJWT = async (req, res) => {
  try {
    const { data, error } = await getAllTiposRecurso();
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Obtener periodos académicos
export const getPeriodosAcademicosJWT = async (req, res) => {
  try {
    const { data, error } = await getAllPeriodosAcademicos();
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Registrar nuevo salón (CU5)
export const createSalonJWT = async (req, res) => {
  try {
    const {
      codigo_salon,
      nombre_salon,
      id_edificio,
      numero_piso,
      capacidad,
      descripcion_ubicacion,
      recursos,
    } = req.body;

    // Validaciones básicas
    if (!codigo_salon || !id_edificio || capacidad === undefined) {
      return res.status(400).json({
        message: "Campos obligatorios: codigo_salon, id_edificio, capacidad",
      });
    }

    const cap = Number(capacidad);
    if (Number.isNaN(cap) || cap <= 0) {
      return res.status(400).json({
        message: "La capacidad debe ser un valor numérico mayor a cero",
      });
    }

    const salonData = {
      codigo_salon,
      nombre_salon: nombre_salon || null,
      id_edificio,
      numero_piso: numero_piso ?? null,
      capacidad: cap,
      descripcion_ubicacion: descripcion_ubicacion || null,
      esta_activo: true,
    };

    const { data: salon, error } = await createSalon(salonData);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Registrar recursos si se envían
    let recursosCreados = [];
    if (Array.isArray(recursos) && recursos.length > 0) {
      const { data: recData, error: recError } = await createRecursosSalon(
        salon.id_salon,
        recursos
      );
      if (recError) {
        return res.status(500).json({ message: recError.message });
      }
      recursosCreados = recData;
    }

    // Auditoría
    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "CREAR_SALON",
      tipo_entidad: "SALON",
      id_entidad: salon.id_salon,
      valores_nuevos: {
        ...salon,
        recursos: recursosCreados.map((r) => ({
          id_tipo_recurso: r.id_tipo_recurso,
          cantidad: r.cantidad,
        })),
      },
    });

    return res.status(201).json({
      message: `Salón ${salon.codigo_salon} creado exitosamente`,
      salon,
      recursos: recursosCreados,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Editar salón
export const updateSalonJWT = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener salón actual
    const { data: salonActual, error: errorSalon } = await getSalonById(id);
    if (errorSalon || !salonActual) {
      return res.status(404).json({ message: "Salón no encontrado" });
    }

    if (salonActual.esta_activo === false) {
      return res.status(400).json({
        message: "No se puede editar un salón inactivo",
      });
    }

    const {
      codigo_salon,
      nombre_salon,
      id_edificio,
      numero_piso,
      capacidad,
      descripcion_ubicacion,
      recursos,
    } = req.body;

    const nuevosDatosSalon = {};

    if (codigo_salon !== undefined) nuevosDatosSalon.codigo_salon = codigo_salon;
    if (nombre_salon !== undefined) nuevosDatosSalon.nombre_salon = nombre_salon || null;
    if (id_edificio !== undefined) nuevosDatosSalon.id_edificio = id_edificio;
    if (numero_piso !== undefined) nuevosDatosSalon.numero_piso = numero_piso ?? null;
    
    if (capacidad !== undefined) {
      const cap = Number(capacidad);
      if (Number.isNaN(cap) || cap <= 0) {
        return res.status(400).json({
          message: "La capacidad debe ser un valor numérico mayor a cero",
        });
      }
      nuevosDatosSalon.capacidad = cap;
    }

    if (descripcion_ubicacion !== undefined) {
      nuevosDatosSalon.descripcion_ubicacion = descripcion_ubicacion || null;
    }

    // Actualizar datos del salón si hay cambios
    if (Object.keys(nuevosDatosSalon).length > 0) {
      const { data: salonActualizado, error: errorUpdate } = await updateSalon(
        id,
        nuevosDatosSalon
      );
      if (errorUpdate) {
        return res.status(400).json({ message: errorUpdate.message });
      }
    }

    // Actualizar recursos si se envían
    if (recursos !== undefined) {
      if (!Array.isArray(recursos)) {
        return res.status(400).json({
          message: "El campo recursos debe ser un array",
        });
      }

      // Eliminar recursos anteriores y crear nuevos
      await deleteRecursosBySalon(id);
      
      if (recursos.length > 0) {
        const { error: errorRecursos } = await createRecursosSalon(id, recursos);
        if (errorRecursos) {
          return res.status(500).json({ message: errorRecursos.message });
        }
      }
    }

    // Obtener datos actualizados
    const { data: salonFinal } = await getSalonById(id);

    // Auditoría
    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "EDITAR_SALON",
      tipo_entidad: "SALON",
      id_entidad: parseInt(id, 10),
      valores_antiguos: salonActual,
      valores_nuevos: salonFinal,
    });

    return res.status(200).json({
      message: `Salón ${salonFinal.codigo_salon} actualizado correctamente`,
      salon: salonFinal,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Eliminar salón (baja lógica)
export const deleteSalonJWT = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener salón actual
    const { data: salonActual, error: errorSalon } = await getSalonById(id);
    if (errorSalon || !salonActual) {
      return res.status(404).json({ message: "Salón no encontrado" });
    }

    if (salonActual.esta_activo === false) {
      return res.status(400).json({
        message: "El salón ya se encuentra inactivo",
      });
    }

    // Verificar si hay asignaciones activas
    const { count, error: errorCount } = await countAsignacionesActivasPorSalon(id);
    if (errorCount) {
      return res.status(500).json({ message: errorCount.message });
    }

    if (count > 0) {
      return res.status(400).json({
        message: "No se puede desactivar el salón porque tiene asignaciones activas",
      });
    }

    // Desactivar salón
    const { data, error } = await desactivarSalon(id);
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    // Auditoría
    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "ELIMINAR_SALON",
      tipo_entidad: "SALON",
      id_entidad: parseInt(id, 10),
      valores_antiguos: salonActual,
      valores_nuevos: data,
    });

    return res.status(200).json({
      message: `Salón ${data.codigo_salon} desactivado correctamente`,
      salon: data,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};