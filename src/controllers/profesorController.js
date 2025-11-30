// src/controllers/profesorController.js
import {
  getAllProfesores,
  getProfesorById,
  createProfesor,
  updateProfesor,
  desactivarProfesor,
} from "../models/profesorModel.js";
import {
  createEspecialidades,
  deleteEspecialidadesByProfesor,
} from "../models/especialidadProfesorModel.js";
import { createUserBasic, findUserByEmail } from "../models/userModel.js";
import { registrarAuditoria } from "../models/auditoriaModel.js";
import { supabase } from "../config/supabaseClient.js";

// Listar profesores
export const getProfesoresJWT = async (req, res) => {
  try {
    const { data, error } = await getAllProfesores();
    if (error) return res.status(500).json({ message: error.message });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Ver detalle de un profesor
export const getProfesorByIdJWT = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await getProfesorById(id);
    if (error || !data) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Registrar nuevo profesor
export const createProfesorJWT = async (req, res) => {
  try {
    const {
      numero_identificacion,
      nombre,
      apellido,
      correo,
      biografia,
      cualificaciones,
      especialidades,
    } = req.body;

    // El archivo ahora viene en req.files (array)
    const hojaVidaFile = req.files?.find(f => f.fieldname === 'hoja_vida');

    console.log("===== DEBUG RECEPCIÓN FORM =====");
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    console.log("hojaVidaFile:", hojaVidaFile);

    // Validaciones
    if (!numero_identificacion || !nombre || !apellido || !correo) {
      return res.status(400).json({
        message: "Campos obligatorios: numero_identificacion, nombre, apellido, correo",
      });
    }

    if (!hojaVidaFile) {
      return res.status(400).json({
        message: "Debe adjuntar la hoja de vida en formato PDF",
      });
    }

    let especialidadesArray = [];
    if (especialidades) {
      try {
        especialidadesArray = JSON.parse(especialidades);
      } catch {
        return res.status(400).json({
          message: "El campo especialidades debe ser un JSON válido",
        });
      }
    }

    if (!Array.isArray(especialidadesArray) || especialidadesArray.length === 0) {
      return res.status(400).json({
        message: "Debe registrar al menos una especialidad",
      });
    }

    // Verificar correo único
    const { data: duplicate } = await findUserByEmail(correo);
    if (duplicate) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    // 1. Crear usuario (rol PROFESOR = 4)
    const usuarioData = {
      nombre_usuario: correo.split("@")[0],
      correo,
      hash_contrasena: "", // Sin contraseña inicial
      nombre,
      apellido,
      id_rol: 4,
      esta_activo: true,
    };

    const { data: usuario, error: errorUsuario } = await createUserBasic(usuarioData);
    if (errorUsuario) {
      return res.status(500).json({ message: errorUsuario.message });
    }

    // 2. Subir hoja de vida a Supabase Storage
    const fileName = `${Date.now()}_${hojaVidaFile.originalname}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("hojas-vida")
      .upload(fileName, hojaVidaFile.buffer, {
        contentType: hojaVidaFile.mimetype,
      });

    if (uploadError) {
      return res.status(500).json({
        message: "Error al subir hoja de vida: " + uploadError.message,
      });
    }

    const { data: urlData } = supabase.storage
      .from("hojas-vida")
      .getPublicUrl(fileName);

    const url_hoja_vida = urlData.publicUrl;

    // 3. Crear profesor
    const profesorData = {
      id_usuario: usuario.id_usuario,
      numero_identificacion,
      biografia: biografia || null,
      cualificaciones: cualificaciones || null,
      url_hoja_vida,
    };

    const { data: profesor, error: errorProfesor } = await createProfesor(profesorData);
    if (errorProfesor) {
      return res.status(400).json({ message: errorProfesor.message });
    }

    // 4. Crear especialidades
    const { data: especialidadesCreadas, error: errorEsp } = await createEspecialidades(
      profesor.id_profesor,
      especialidadesArray
    );
    if (errorEsp) {
      return res.status(500).json({ message: errorEsp.message });
    }

    // Auditoría
    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "CREAR_PROFESOR",
      tipo_entidad: "PROFESOR",
      id_entidad: profesor.id_profesor,
      valores_nuevos: {
        ...profesor,
        especialidades: especialidadesCreadas,
      },
    });

    return res.status(201).json({
      message: `Profesor ${nombre} ${apellido} registrado exitosamente`,
      profesor: {
        ...profesor,
        usuario,
        especialidades: especialidadesCreadas,
      },
    });
  } catch (err) {
    console.error("Error en createProfesorJWT:", err);
    return res.status(500).json({ message: err.message });
  }
};

// Editar profesor
export const updateProfesorJWT = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      numero_identificacion,
      biografia,
      cualificaciones,
      nombre,
      apellido,
      especialidades,
    } = req.body;

    const hojaVidaFile = req.files?.find(f => f.fieldname === 'hoja_vida');

    // Obtener profesor actual
    const { data: profesorActual, error: errorProf } = await getProfesorById(id);
    if (errorProf || !profesorActual) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    const nuevosDatosProfesor = {};
    if (numero_identificacion) nuevosDatosProfesor.numero_identificacion = numero_identificacion;
    if (biografia !== undefined) nuevosDatosProfesor.biografia = biografia;
    if (cualificaciones !== undefined) nuevosDatosProfesor.cualificaciones = cualificaciones;

    // Si hay nuevo archivo PDF, subirlo y reemplazar URL
    if (hojaVidaFile) {
      const fileName = `${Date.now()}_${hojaVidaFile.originalname}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("hojas-vida")
        .upload(fileName, hojaVidaFile.buffer, {
          contentType: hojaVidaFile.mimetype,
        });

      if (uploadError) {
        return res.status(500).json({
          message: "Error al subir nueva hoja de vida: " + uploadError.message,
        });
      }

      const { data: urlData } = supabase.storage
        .from("hojas-vida")
        .getPublicUrl(fileName);

      nuevosDatosProfesor.url_hoja_vida = urlData.publicUrl;
    }

    // Actualizar datos del profesor
    if (Object.keys(nuevosDatosProfesor).length > 0) {
      const { error: errorUpdate } = await updateProfesor(id, nuevosDatosProfesor);
      if (errorUpdate) {
        return res.status(400).json({ message: errorUpdate.message });
      }
    }

    // Actualizar usuario (nombre, apellido) si se envían
    if (nombre || apellido) {
      const nuevosDatosUsuario = {};
      if (nombre) nuevosDatosUsuario.nombre = nombre;
      if (apellido) nuevosDatosUsuario.apellido = apellido;

      await supabase
        .from("usuario")
        .update(nuevosDatosUsuario)
        .eq("id_usuario", profesorActual.usuario.id_usuario);
    }

    // Actualizar especialidades si se envían
    if (especialidades) {
      let especialidadesArray = [];
      try {
        especialidadesArray = JSON.parse(especialidades);
      } catch {
        return res.status(400).json({
          message: "El campo especialidades debe ser un JSON válido",
        });
      }

      if (especialidadesArray.length === 0) {
        return res.status(400).json({
          message: "Debe tener al menos una especialidad",
        });
      }

      // Eliminar especialidades anteriores y crear nuevas
      await deleteEspecialidadesByProfesor(id);
      await createEspecialidades(id, especialidadesArray);
    }

    // Obtener datos actualizados
    const { data: profesorActualizado } = await getProfesorById(id);

    // Auditoría
    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "EDITAR_PROFESOR",
      tipo_entidad: "PROFESOR",
      id_entidad: parseInt(id, 10),
      valores_antiguos: profesorActual,
      valores_nuevos: profesorActualizado,
    });

    return res.status(200).json({
      message: "Profesor actualizado correctamente",
      profesor: profesorActualizado,
    });
  } catch (err) {
    console.error("Error en updateProfesorJWT:", err);
    return res.status(500).json({ message: err.message });
  }
};

// Eliminar profesor (baja lógica)
export const deleteProfesorJWT = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: profesorActual, error: errorProf } = await getProfesorById(id);
    if (errorProf || !profesorActual) {
      return res.status(404).json({ message: "Profesor no encontrado" });
    }

    // Desactivar usuario
    const { error: errorDesactivar } = await desactivarProfesor(
      profesorActual.usuario.id_usuario
    );
    if (errorDesactivar) {
      return res.status(500).json({ message: errorDesactivar.message });
    }

    // Auditoría
    await registrarAuditoria({
      id_usuario: req.user.UserID,
      tipo_accion: "ELIMINAR_PROFESOR",
      tipo_entidad: "PROFESOR",
      id_entidad: parseInt(id, 10),
      valores_antiguos: profesorActual,
    });

    return res.status(200).json({
      message: "Profesor eliminado (desactivado) correctamente",
    });
  } catch (err) {
    console.error("Error en deleteProfesorJWT:", err);
    return res.status(500).json({ message: err.message });
  }
};
