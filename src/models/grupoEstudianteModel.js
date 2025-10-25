// src/models/grupoEstudianteModel.js
import { supabase } from "../config/supabaseClient.js"

export const GrupoEstudianteModel = {
  async getAll() {
    const { data, error } = await supabase.from("grupo_estudiante").select("*, nivel_academico(*)")
    if (error) throw error
    return data
  },

  async getById(id_grupo) {
    const { data, error } = await supabase
      .from("grupo_estudiante")
      .select("*, nivel_academico(*)")
      .eq("id_grupo", id_grupo)
      .single()
    if (error) throw error
    return data
  },

  async getByNivel(id_nivel_academico) {
    const { data, error } = await supabase
      .from("grupo_estudiante")
      .select("*, nivel_academico(*)")
      .eq("id_nivel_academico", id_nivel_academico)
    if (error) throw error
    return data
  },

  async create({ nombre_grupo, codigo_grupo, id_nivel_academico, cantidad_estudiantes, requisitos_especiales }) {
    const { data, error } = await supabase
      .from("grupo_estudiante")
      .insert([{ nombre_grupo, codigo_grupo, id_nivel_academico, cantidad_estudiantes, requisitos_especiales }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(
    id_grupo,
    { nombre_grupo, codigo_grupo, id_nivel_academico, cantidad_estudiantes, requisitos_especiales, esta_activo },
  ) {
    const { data, error } = await supabase
      .from("grupo_estudiante")
      .update({
        nombre_grupo,
        codigo_grupo,
        id_nivel_academico,
        cantidad_estudiantes,
        requisitos_especiales,
        esta_activo,
      })
      .eq("id_grupo", id_grupo)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_grupo) {
    const { error } = await supabase.from("grupo_estudiante").delete().eq("id_grupo", id_grupo)
    if (error) throw error
    return { message: "Grupo eliminado correctamente" }
  },
}
