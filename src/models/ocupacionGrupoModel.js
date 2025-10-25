// src/models/ocupacionGrupoModel.js
import { supabase } from "../config/supabaseClient.js"

export const OcupacionGrupoModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("ocupacion_grupo")
      .select("*, grupo_estudiante(*), periodo_academico(*)")
    if (error) throw error
    return data
  },

  async getById(id_ocupacion) {
    const { data, error } = await supabase
      .from("ocupacion_grupo")
      .select("*, grupo_estudiante(*), periodo_academico(*)")
      .eq("id_ocupacion", id_ocupacion)
      .single()
    if (error) throw error
    return data
  },

  async getByGrupo(id_grupo) {
    const { data, error } = await supabase
      .from("ocupacion_grupo")
      .select("*, periodo_academico(*)")
      .eq("id_grupo", id_grupo)
    if (error) throw error
    return data
  },

  async getByGrupoYPeriodo(id_grupo, id_periodo_academico) {
    const { data, error } = await supabase
      .from("ocupacion_grupo")
      .select("*")
      .eq("id_grupo", id_grupo)
      .eq("id_periodo_academico", id_periodo_academico)
      .order("dia_semana", { ascending: true })
      .order("hora_inicio", { ascending: true })
    if (error) throw error
    return data
  },

  async create({ id_grupo, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo }) {
    const { data, error } = await supabase
      .from("ocupacion_grupo")
      .insert([{ id_grupo, id_periodo_academico, dia_semana, hora_inicio, hora_fin, motivo }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_ocupacion, { dia_semana, hora_inicio, hora_fin, motivo }) {
    const { data, error } = await supabase
      .from("ocupacion_grupo")
      .update({ dia_semana, hora_inicio, hora_fin, motivo })
      .eq("id_ocupacion", id_ocupacion)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_ocupacion) {
    const { error } = await supabase.from("ocupacion_grupo").delete().eq("id_ocupacion", id_ocupacion)
    if (error) throw error
    return { message: "Ocupación eliminada correctamente" }
  },
}
