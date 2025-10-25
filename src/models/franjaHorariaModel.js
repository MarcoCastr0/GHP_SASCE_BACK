// src/models/franjaHorariaModel.js
import { supabase } from "../config/supabaseClient.js"

export const FranjaHorariaModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("franja_horaria")
      .select("*")
      .order("dia_semana", { ascending: true })
      .order("hora_inicio", { ascending: true })
    if (error) throw error
    return data
  },

  async getById(id_franja_horaria) {
    const { data, error } = await supabase
      .from("franja_horaria")
      .select("*")
      .eq("id_franja_horaria", id_franja_horaria)
      .single()
    if (error) throw error
    return data
  },

  async getByDia(dia_semana) {
    const { data, error } = await supabase
      .from("franja_horaria")
      .select("*")
      .eq("dia_semana", dia_semana)
      .order("hora_inicio", { ascending: true })
    if (error) throw error
    return data
  },

  async create({ dia_semana, hora_inicio, hora_fin, duracion_minutos }) {
    const { data, error } = await supabase
      .from("franja_horaria")
      .insert([{ dia_semana, hora_inicio, hora_fin, duracion_minutos }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_franja_horaria, { dia_semana, hora_inicio, hora_fin, duracion_minutos }) {
    const { data, error } = await supabase
      .from("franja_horaria")
      .update({ dia_semana, hora_inicio, hora_fin, duracion_minutos })
      .eq("id_franja_horaria", id_franja_horaria)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_franja_horaria) {
    const { error } = await supabase.from("franja_horaria").delete().eq("id_franja_horaria", id_franja_horaria)
    if (error) throw error
    return { message: "Franja horaria eliminada correctamente" }
  },
}
