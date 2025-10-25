// src/models/caracteristicaGrupoModel.js
import { supabase } from "../config/supabaseClient.js"

export const CaracteristicaGrupoModel = {
  async getAll() {
    const { data, error } = await supabase.from("caracteristica_grupo").select("*, grupo_estudiante(*)")
    if (error) throw error
    return data
  },

  async getById(id_caracteristica) {
    const { data, error } = await supabase
      .from("caracteristica_grupo")
      .select("*, grupo_estudiante(*)")
      .eq("id_caracteristica", id_caracteristica)
      .single()
    if (error) throw error
    return data
  },

  async getByGrupo(id_grupo) {
    const { data, error } = await supabase.from("caracteristica_grupo").select("*").eq("id_grupo", id_grupo)
    if (error) throw error
    return data
  },

  async create({ id_grupo, tipo_caracteristica, valor_caracteristica }) {
    const { data, error } = await supabase
      .from("caracteristica_grupo")
      .insert([{ id_grupo, tipo_caracteristica, valor_caracteristica }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_caracteristica, { tipo_caracteristica, valor_caracteristica }) {
    const { data, error } = await supabase
      .from("caracteristica_grupo")
      .update({ tipo_caracteristica, valor_caracteristica })
      .eq("id_caracteristica", id_caracteristica)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_caracteristica) {
    const { error } = await supabase.from("caracteristica_grupo").delete().eq("id_caracteristica", id_caracteristica)
    if (error) throw error
    return { message: "Característica eliminada correctamente" }
  },
}
