// src/models/especialidadProfesorModel.js
import { supabase } from "../config/supabaseClient.js";

export const EspecialidadProfesorModel = {
  // Obtener todas las especialidades
  async getAll() {
    const { data, error } = await supabase
      .from("especialidad_profesor")
      .select(`
        id_especialidad,
        id_profesor,
        nombre_especialidad,
        nivel_competencia,
        profesor (id_profesor, nombre, apellido)
      `);
    if (error) throw error;
    return data;
  },

  // Obtener especialidad por ID
  async getById(id_especialidad) {
    const { data, error } = await supabase
      .from("especialidad_profesor")
      .select("*")
      .eq("id_especialidad", id_especialidad)
      .single();
    if (error) throw error;
    return data;
  },

  // Crear nueva especialidad
  async create(especialidad) {
    const { data, error } = await supabase
      .from("especialidad_profesor")
      .insert([especialidad])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Actualizar especialidad
  async update(id_especialidad, especialidad) {
    const { data, error } = await supabase
      .from("especialidad_profesor")
      .update(especialidad)
      .eq("id_especialidad", id_especialidad)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Eliminar especialidad
  async delete(id_especialidad) {
    const { error } = await supabase
      .from("especialidad_profesor")
      .delete()
      .eq("id_especialidad", id_especialidad);
    if (error) throw error;
    return { message: "Especialidad eliminada correctamente" };
  },
};
