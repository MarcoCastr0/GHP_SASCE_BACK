// src/models/estudianteGrupoModel.js
import { supabase } from "../config/supabaseClient.js"

export const EstudianteGrupoModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("estudiante_grupo")
      .select("*, estudiante(*), grupo_estudiante(*), periodo_academico(*)")
    if (error) throw error
    return data
  },

  async getById(id_estudiante_grupo) {
    const { data, error } = await supabase
      .from("estudiante_grupo")
      .select("*, estudiante(*), grupo_estudiante(*), periodo_academico(*)")
      .eq("id_estudiante_grupo", id_estudiante_grupo)
      .single()
    if (error) throw error
    return data
  },

  async getByEstudiante(id_estudiante) {
    const { data, error } = await supabase
      .from("estudiante_grupo")
      .select("*, grupo_estudiante(*), periodo_academico(*)")
      .eq("id_estudiante", id_estudiante)
    if (error) throw error
    return data
  },

  async getByGrupo(id_grupo) {
    const { data, error } = await supabase
      .from("estudiante_grupo")
      .select("*, estudiante(*), periodo_academico(*)")
      .eq("id_grupo", id_grupo)
    if (error) throw error
    return data
  },

  async getByGrupoYPeriodo(id_grupo, id_periodo_academico) {
    const { data, error } = await supabase
      .from("estudiante_grupo")
      .select("*, estudiante(*)")
      .eq("id_grupo", id_grupo)
      .eq("id_periodo_academico", id_periodo_academico)
      .eq("esta_activo", true)
    if (error) throw error
    return data
  },

  async create({ id_estudiante, id_grupo, id_periodo_academico, fecha_inscripcion, estado_inscripcion }) {
    const { data, error } = await supabase
      .from("estudiante_grupo")
      .insert([{ id_estudiante, id_grupo, id_periodo_academico, fecha_inscripcion, estado_inscripcion }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_estudiante_grupo, { fecha_retiro, estado_inscripcion, esta_activo }) {
    const { data, error } = await supabase
      .from("estudiante_grupo")
      .update({ fecha_retiro, estado_inscripcion, esta_activo })
      .eq("id_estudiante_grupo", id_estudiante_grupo)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_estudiante_grupo) {
    const { error } = await supabase.from("estudiante_grupo").delete().eq("id_estudiante_grupo", id_estudiante_grupo)
    if (error) throw error
    return { message: "Matrícula eliminada correctamente" }
  },
}
