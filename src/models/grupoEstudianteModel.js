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
      fecha_creacion,
      nivel_academico:nivel_academico (
        id_nivel,
        nombre_nivel,
        orden_nivel
      )
    `
    )
    .order("fecha_creacion", { ascending: false });

  return { data, error };
};

// Crear un nuevo grupo de estudiantes
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

  // Manejo básico de errores de unicidad (nombre_grupo, codigo_grupo)
  if (error) {
    if (error.code === "23505") {
      // Violación de UNIQUE constraint
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
