// src/models/asignacionModel.js
import { supabase } from "../config/supabaseClient.js"

export const AsignacionModel = {
  async getAll() {
    const { data, error } = await supabase.from("asignacion").select(`
        *,
        grupo_estudiante(*),
        salon(*),
        profesor(*),
        periodo_academico(*),
        franja_horaria(*),
        tipo_asignacion(*),
        usuario:id_usuario_creador(*)
      `)
    if (error) throw error
    return data
  },

  async getById(id_asignacion) {
    const { data, error } = await supabase
      .from("asignacion")
      .select(`
        *,
        grupo_estudiante(*),
        salon(*),
        profesor(*),
        periodo_academico(*),
        franja_horaria(*),
        tipo_asignacion(*),
        usuario:id_usuario_creador(*)
      `)
      .eq("id_asignacion", id_asignacion)
      .single()
    if (error) throw error
    return data
  },

  async getByPeriodo(id_periodo_academico) {
    const { data, error } = await supabase
      .from("asignacion")
      .select(`
        *,
        grupo_estudiante(*),
        salon(*),
        profesor(*),
        franja_horaria(*),
        tipo_asignacion(*)
      `)
      .eq("id_periodo_academico", id_periodo_academico)
    if (error) throw error
    return data
  },

  async getByProfesor(id_profesor) {
    const { data, error } = await supabase
      .from("asignacion")
      .select(`
        *,
        grupo_estudiante(*),
        salon(*),
        periodo_academico(*),
        franja_horaria(*),
        tipo_asignacion(*)
      `)
      .eq("id_profesor", id_profesor)
    if (error) throw error
    return data
  },

  async getByGrupo(id_grupo) {
    const { data, error } = await supabase
      .from("asignacion")
      .select(`
        *,
        salon(*),
        profesor(*),
        periodo_academico(*),
        franja_horaria(*),
        tipo_asignacion(*)
      `)
      .eq("id_grupo", id_grupo)
    if (error) throw error
    return data
  },

  async getBySalon(id_salon) {
    const { data, error } = await supabase
      .from("asignacion")
      .select(`
        *,
        grupo_estudiante(*),
        profesor(*),
        periodo_academico(*),
        franja_horaria(*),
        tipo_asignacion(*)
      `)
      .eq("id_salon", id_salon)
    if (error) throw error
    return data
  },

  async create({
    id_grupo,
    id_salon,
    id_profesor,
    id_periodo_academico,
    id_franja_horaria,
    id_tipo_asignacion,
    id_usuario_creador,
  }) {
    const { data, error } = await supabase
      .from("asignacion")
      .insert([
        {
          id_grupo,
          id_salon,
          id_profesor,
          id_periodo_academico,
          id_franja_horaria,
          id_tipo_asignacion,
          id_usuario_creador,
        },
      ])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_asignacion, { id_grupo, id_salon, id_profesor, id_franja_horaria }) {
    const { data, error } = await supabase
      .from("asignacion")
      .update({ id_grupo, id_salon, id_profesor, id_franja_horaria })
      .eq("id_asignacion", id_asignacion)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_asignacion) {
    const { error } = await supabase.from("asignacion").delete().eq("id_asignacion", id_asignacion)
    if (error) throw error
    return { message: "Asignación eliminada correctamente" }
  },
}
