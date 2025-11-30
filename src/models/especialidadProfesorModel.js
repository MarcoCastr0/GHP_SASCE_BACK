// src/models/especialidadProfesorModel.js
import { supabase } from "../config/supabaseClient.js";

// Crear especialidades para un profesor
export const createEspecialidades = async (id_profesor, especialidades) => {
  if (!especialidades || especialidades.length === 0) {
    return { data: [], error: null };
  }

  const payload = especialidades.map((esp) => ({
    id_profesor,
    nombre_especialidad: esp.nombre_especialidad,
    nivel_competencia: esp.nivel_competencia || null,
  }));

  const { data, error } = await supabase
    .from("especialidad_profesor")
    .insert(payload)
    .select("id_especialidad, nombre_especialidad, nivel_competencia");

  return { data, error };
};

// Eliminar todas las especialidades de un profesor (para actualizar)
export const deleteEspecialidadesByProfesor = async (id_profesor) => {
  const { error } = await supabase
    .from("especialidad_profesor")
    .delete()
    .eq("id_profesor", id_profesor);

  return { error };
};
