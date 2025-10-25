// src/models/ocupacionEstudianteModel.js
import { supabase } from "../config/supabaseClient.js"

export const OcupacionEstudianteModel = {
  async getAll() {
    const { data, error } = await supabase.from("ocupacion_estudiante").select("*, estudiante(*), periodo_academico(*)")
    if (error) throw error
    return data
  },

  async getById(id_ocupacion) {
    const { data, error } = await supabase
      .from("ocupacion_estudiante")
      .select("*, estudiante(*), periodo_academico(*)")
      .eq("id_ocupacion", id_ocupacion)
      .single()
    if (error) throw error
    return data
  },

  async getByEstudiante(id_estudiante) {
    const { data, error } = await supabase
      .from("ocupacion_estudiante")
      .select("*, periodo_academico(*)")
      .eq("id_estudiante", id_estudiante)
    if (error) throw error
    return data
  },

  async getByEstudianteYPeriodo(id_estudiante, id_periodo_academico) {
    const { data, error } = await supabase
      .from("ocupacion_estudiante")
      .select("*")
      .eq("id_estudiante", id_estudiante)
      .eq("id_periodo_academico", id_periodo_academico)
      .order("dia_semana", { ascending: true })
      .order("hora_inicio", { ascending: true })
    if (error) throw error
    return data
  },

  async create({ id_estudiante, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo }) {
    const { data, error } = await supabase
      .from("ocupacion_estudiante")
      .insert([{ id_estudiante, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_ocupacion, { dia_semana, hora_inicio, hora_fin, motivo }) {
    const { data, error } = await supabase
      .from("ocupacion_estudiante")
      .update({ dia_semana, hora_inicio, hora_fin, motivo })
      .eq("id_ocupacion", id_ocupacion)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_ocupacion) {
    const { error } = await supabase.from("ocupacion_estudiante").delete().eq("id_ocupacion", id_ocupacion)
    if (error) throw error
    return { message: "Ocupación eliminada correctamente" }
  },
}
