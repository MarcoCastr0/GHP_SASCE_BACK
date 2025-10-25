// src/models/ocupacionProfesorModel.js
import { supabase } from "../config/supabaseClient.js"

export const OcupacionProfesorModel = {
  // Obtener todas las ocupaciones de profesores
  async getAll() {
    const { data, error } = await supabase.from("ocupacion_profesor").select("*, profesor(*), periodo_academico(*)")
    if (error) throw error
    return data
  },

  // Obtener ocupación por ID
  async getById(id_ocupacion) {
    const { data, error } = await supabase
      .from("ocupacion_profesor")
      .select("*, profesor(*), periodo_academico(*)")
      .eq("id_ocupacion", id_ocupacion)
      .single()
    if (error) throw error
    return data
  },

  // Obtener ocupaciones por profesor
  async getByProfesor(id_profesor) {
    const { data, error } = await supabase
      .from("ocupacion_profesor")
      .select("*, periodo_academico(*)")
      .eq("id_profesor", id_profesor)
    if (error) throw error
    return data
  },

  // Obtener ocupaciones por profesor y período
  async getByProfesorYPeriodo(id_profesor, id_periodo_academico) {
    const { data, error } = await supabase
      .from("ocupacion_profesor")
      .select("*")
      .eq("id_profesor", id_profesor)
      .eq("id_periodo_academico", id_periodo_academico)
    if (error) throw error
    return data
  },

  // Crear nueva ocupación
  async create({ id_profesor, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo }) {
    const { data, error } = await supabase
      .from("ocupacion_profesor")
      .insert([{ id_profesor, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo }])
      .select()
    if (error) throw error
    return data[0]
  },

  // Actualizar ocupación
  async update(id_ocupacion, { dia_semana, hora_inicio, hora_fin, motivo }) {
    const { data, error } = await supabase
      .from("ocupacion_profesor")
      .update({ dia_semana, hora_inicio, hora_fin, motivo })
      .eq("id_ocupacion", id_ocupacion)
      .select()
    if (error) throw error
    return data[0]
  },

  // Eliminar ocupación
  async remove(id_ocupacion) {
    const { error } = await supabase.from("ocupacion_profesor").delete().eq("id_ocupacion", id_ocupacion)
    if (error) throw error
    return { message: "Ocupación eliminada correctamente" }
  },
}
