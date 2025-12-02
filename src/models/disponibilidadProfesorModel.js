import { supabase } from "../config/supabaseClient.js";

export const disponibilidadProfesorModel = {
  // Obtener disponibilidad por profesor
  async getByProfesorId(id_profesor) {
    const { data, error } = await supabase
      .from("ocupacion_profesor")
      .select("*")
      .eq("id_profesor", id_profesor);

    if (error) throw error;
    return data;
  },
  // Obtener una disponibilidad por su ID
async getById(id_ocupacion) {
    const { data, error } = await supabase
      .from("ocupacion_profesor")
      .select("*")
      .eq("id_ocupacion", id_ocupacion)
      .single(); // Retorna un solo registro
  
    if (error) throw error;
    return data;
  },
  

  // Verificar solapamientos con otras disponibilidades
  async verificarConflictoDisponibilidad(id_profesor, dia_semana, hora_inicio, hora_fin, excluir_id = null) {
    let query = supabase
      .from("ocupacion_profesor")
      .select("id_ocupacion, hora_inicio, hora_fin")
      .eq("id_profesor", id_profesor)
      .eq("dia_semana", dia_semana);

    if (excluir_id) query.neq("id_ocupacion", excluir_id);

    const { data, error } = await query;
    if (error) throw error;

    return data.some(reg => hora_inicio < reg.hora_fin && hora_fin > reg.hora_inicio);
  },

  // Verificar conflicto con asignaciones del profesor
  async verificarConflictoAsignaciones(id_profesor, dia_semana, hora_inicio, hora_fin, excluir_id = null) {
    let query = supabase
      .from("ocupacion_profesor")
      .select("id_ocupacion, hora_inicio, hora_fin")
      .eq("id_profesor", id_profesor)
      .eq("dia_semana", dia_semana);

    if (excluir_id) query.neq("id_ocupacion", excluir_id);

    const { data, error } = await query;
    if (error) throw error;
    if (!data) return false;

    return data.some(reg => hora_inicio < reg.hora_fin && hora_fin > reg.hora_inicio);
  },

  // Crear disponibilidad
  async createDisponibilidad(disponibilidad) {
    const { data, error } = await supabase
      .from("ocupacion_profesor")
      .insert([disponibilidad])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Actualizar disponibilidad
  async updateDisponibilidad(id_ocupacion, disponibilidad) {
    const { data, error } = await supabase
      .from("ocupacion_profesor")
      .update(disponibilidad)
      .eq("id_ocupacion", id_ocupacion)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Eliminar disponibilidad
  async delete(id_ocupacion) {
    const { error } = await supabase
      .from("ocupacion_profesor")
      .delete()
      .eq("id_ocupacion", id_ocupacion);

    if (error) throw error;
    return true;
  }

  
};


