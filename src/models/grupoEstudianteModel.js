// src/models/grupoEstudianteModel.js
import { supabase } from "../config/supabaseClient.js";

// Listar todos los grupos de estudiantes
export const getAllGruposEstudiante = async () => {
  const { data, error } = await supabase
    .from("grupo_estudiante")
    .select(
      `
      id_grupo,
      nombre_grupo,
      codigo_grupo,
      id_nivel_academico,
      cantidad_estudiantes,
      requisitos_especiales,
      esta_activo,
      fecha_creacion
    `
    )
    .order("fecha_creacion", { ascending: false });

  return { data, error };
};

// Obtener un grupo por ID
export const getGrupoById = async (id_grupo) => {
  const { data, error } = await supabase
    .from("grupo_estudiante")
    .select(
      `
      id_grupo,
      nombre_grupo,
      codigo_grupo,
      id_nivel_academico,
      cantidad_estudiantes,
      requisitos_especiales,
      esta_activo,
      fecha_creacion,
      fecha_actualizacion
    `
    )
    .eq("id_grupo", id_grupo)
    .single();

  return { data, error };
};

// Crear un nuevo grupo de estudiantes (CU3, ya lo tenías)
export const createGrupoEstudiante = async (grupoData) => {
  const { data, error } = await supabase
    .from("grupo_estudiante")
    .insert([grupoData])
    .select(
      `
      id_grupo,
      nombre_grupo,
      codigo_grupo,
      id_nivel_academico,
      cantidad_estudiantes,
      requisitos_especiales,
      esta_activo,
      fecha_creacion
    `
    )
    .single();

  if (error) {
    if (error.code === "23505") {
      if (error.details?.includes("nombre_grupo")) {
        return {
          data: null,
          error: { message: "El nombre del grupo ya está registrado" },
        };
      }
      if (error.details?.includes("codigo_grupo")) {
        return {
          data: null,
          error: { message: "El código del grupo ya está registrado" },
        };
      }
    }
    return { data: null, error };
  }

  return { data, error: null };
};

// ACTUALIZAR grupo existente (CU4)
export const updateGrupoEstudiante = async (id_grupo, nuevosDatos) => {
  const { data, error } = await supabase
    .from("grupo_estudiante")
    .update({
      ...nuevosDatos,
      fecha_actualizacion: new Date().toISOString(),
    })
    .eq("id_grupo", id_grupo)
    .select(
      `
      id_grupo,
      nombre_grupo,
      codigo_grupo,
      id_nivel_academico,
      cantidad_estudiantes,
      requisitos_especiales,
      esta_activo,
      fecha_creacion,
      fecha_actualizacion
    `
    )
    .single();

  if (error) {
    if (error.code === "23505") {
      if (error.details?.includes("nombre_grupo")) {
        return {
          data: null,
          error: { message: "El nombre del grupo ya está registrado" },
        };
      }
      if (error.details?.includes("codigo_grupo")) {
        return {
          data: null,
          error: { message: "El código del grupo ya está registrado" },
        };
      }
    }
    return { data: null, error };
  }

  return { data, error: null };
};

// DESACTIVAR grupo (baja lógica, CU4)
export const desactivarGrupoEstudiante = async (id_grupo) => {
  const { data, error } = await supabase
    .from("grupo_estudiante")
    .update({
      esta_activo: false,
      fecha_actualizacion: new Date().toISOString(),
    })
    .eq("id_grupo", id_grupo)
    .select(
      `
      id_grupo,
      nombre_grupo,
      codigo_grupo,
      id_nivel_academico,
      cantidad_estudiantes,
      requisitos_especiales,
      esta_activo,
      fecha_creacion,
      fecha_actualizacion
    `
    )
    .single();

  return { data, error };
};

// CONTAR estudiantes activos por grupo (regla de negocio CU4)
export const countEstudiantesActivosPorGrupo = async (id_grupo) => {
  const { count, error } = await supabase
    .from("estudiante_grupo")
    .select("id_estudiante_grupo", { count: "exact", head: true })
    .eq("id_grupo", id_grupo)
    .eq("esta_activo", true)
    .eq("estado_inscripcion", "ACTIVO");

  return { count: count || 0, error };
};
