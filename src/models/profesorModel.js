// src/models/profesorModel.js
import { supabase } from "../config/supabaseClient.js";

// Listar todos los profesores con sus especialidades
export const getAllProfesores = async () => {
  const { data, error } = await supabase
    .from("profesor")
    .select(
      `
      id_profesor,
      numero_identificacion,
      biografia,
      cualificaciones,
      url_hoja_vida,
      fecha_creacion,
      usuario:id_usuario(
        id_usuario,
        nombre,
        apellido,
        correo,
        esta_activo
      )
    `
    )
    .order("fecha_creacion", { ascending: false });

  if (error) return { data: null, error };

  // Cargar especialidades de cada profesor
  const profesoresConEspecialidades = await Promise.all(
    (data || []).map(async (prof) => {
      const { data: especialidades } = await supabase
        .from("especialidad_profesor")
        .select("id_especialidad, nombre_especialidad, nivel_competencia")
        .eq("id_profesor", prof.id_profesor);

      return {
        ...prof,
        especialidades: especialidades || [],
      };
    })
  );

  return { data: profesoresConEspecialidades, error: null };
};

// Obtener un profesor por ID con detalles completos
export const getProfesorById = async (id_profesor) => {
  const { data, error } = await supabase
    .from("profesor")
    .select(
      `
      id_profesor,
      numero_identificacion,
      biografia,
      cualificaciones,
      url_hoja_vida,
      fecha_creacion,
      fecha_actualizacion,
      usuario:id_usuario(
        id_usuario,
        nombre,
        apellido,
        correo,
        esta_activo
      )
    `
    )
    .eq("id_profesor", id_profesor)
    .single();

  if (error) return { data: null, error };

  // Cargar especialidades
  const { data: especialidades } = await supabase
    .from("especialidad_profesor")
    .select("id_especialidad, nombre_especialidad, nivel_competencia")
    .eq("id_profesor", id_profesor);

  return {
    data: {
      ...data,
      especialidades: especialidades || [],
    },
    error: null,
  };
};

// Crear profesor (requiere ya haber creado el usuario)
export const createProfesor = async (profesorData) => {
  const { data, error } = await supabase
    .from("profesor")
    .insert([profesorData])
    .select(
      `
      id_profesor,
      id_usuario,
      numero_identificacion,
      biografia,
      cualificaciones,
      url_hoja_vida,
      fecha_creacion
    `
    )
    .single();

  if (error) {
    if (error.code === "23505" && error.details?.includes("numero_identificacion")) {
      return {
        data: null,
        error: { message: "El número de identificación ya está registrado" },
      };
    }
    return { data: null, error };
  }

  return { data, error: null };
};

// Actualizar datos del profesor
export const updateProfesor = async (id_profesor, nuevosDatos) => {
  const { data, error } = await supabase
    .from("profesor")
    .update({
      ...nuevosDatos,
      fecha_actualizacion: new Date().toISOString(),
    })
    .eq("id_profesor", id_profesor)
    .select(
      `
      id_profesor,
      id_usuario,
      numero_identificacion,
      biografia,
      cualificaciones,
      url_hoja_vida,
      fecha_actualizacion
    `
    )
    .single();

  if (error) {
    if (error.code === "23505" && error.details?.includes("numero_identificacion")) {
      return {
        data: null,
        error: { message: "El número de identificación ya está registrado" },
      };
    }
    return { data: null, error };
  }

  return { data, error: null };
};

// Desactivar profesor (baja lógica en usuario)
export const desactivarProfesor = async (id_usuario) => {
  const { data, error } = await supabase
    .from("usuario")
    .update({ esta_activo: false })
    .eq("id_usuario", id_usuario)
    .select("id_usuario, esta_activo")
    .single();

  return { data, error };
};
