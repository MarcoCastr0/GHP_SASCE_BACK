// src/controllers/salonController.js
import { getAllSalones, createSalon, createRecursosSalon } from "../models/salonModel.js";
import { getAllEdificios } from "../models/edificioModel.js";
import { getAllTiposRecurso } from "../models/tipoRecursoModel.js";
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
      recursos, // array de { id_tipo_recurso, cantidad, notas }
    } = req.body;

    // Validaciones básicas
    if (!codigo_salon || !id_edificio || capacidad === undefined) {
      return res.status(400).json({
        message:
          "Campos obligatorios: codigo_salon, id_edificio, capacidad",
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
// src/controllers/salonController.js (agregar al final)
import { getAllPeriodosAcademicos } from "../models/periodoAcademicoModel.js";

// ... (tus funciones existentes getSalonesJWT, createSalonJWT, getEdificiosJWT, getTiposRecursoJWT)

// Nuevo: obtener periodos académicos
export const getPeriodosAcademicosJWT = async (req, res) => {
  try {
    const { data, error } = await getAllPeriodosAcademicos();
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
