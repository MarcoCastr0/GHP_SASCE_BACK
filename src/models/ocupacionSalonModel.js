// src/models/ocupacionSalonModel.js
import { supabase } from "../config/supabaseClient.js"

export const OcupacionSalonModel = {
  async getAll() {
    const { data, error } = await supabase.from("ocupacion_salon").select("*, salon(*), periodo_academico(*)")
    if (error) throw error
    return data
  },

  async getById(id_ocupacion) {
    const { data, error } = await supabase
      .from("ocupacion_salon")
      .select("*, salon(*), periodo_academico(*)")
      .eq("id_ocupacion", id_ocupacion)
      .single()
    if (error) throw error
    return data
  },

  async getBySalon(id_salon) {
    const { data, error } = await supabase
      .from("ocupacion_salon")
      .select("*, periodo_academico(*)")
      .eq("id_salon", id_salon)
    if (error) throw error
    return data
  },

  async getBySalonYPeriodo(id_salon, id_periodo_academico) {
    const { data, error } = await supabase
      .from("ocupacion_salon")
      .select("*")
      .eq("id_salon", id_salon)
      .eq("id_periodo_academico", id_periodo_academico)
      .order("dia_semana", { ascending: true })
      .order("hora_inicio", { ascending: true })
    if (error) throw error
    return data
  },

  async create({ id_salon, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo }) {
    const { data, error } = await supabase
      .from("ocupacion_salon")
      .insert([{ id_salon, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_ocupacion, { dia_semana, hora_inicio, hora_fin, motivo }) {
    const { data, error } = await supabase
      .from("ocupacion_salon")
      .update({ dia_semana, hora_inicio, hora_fin, motivo })
      .eq("id_ocupacion", id_ocupacion)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_ocupacion) {
    const { error } = await supabase.from("ocupacion_salon").delete().eq("id_ocupacion", id_ocupacion)
    if (error) throw error
    return { message: "Ocupación eliminada correctamente" }
  },
}
