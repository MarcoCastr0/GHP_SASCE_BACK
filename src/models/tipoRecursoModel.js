// src/models/tipoRecursoModel.js
import { supabase } from "../config/supabaseClient.js"

export const TipoRecursoModel = {
  async getAll() {
    const { data, error } = await supabase.from("tipo_recurso").select("*")
    if (error) throw error
    return data
  },

  async getById(id_tipo_recurso) {
    const { data, error } = await supabase
      .from("tipo_recurso")
      .select("*")
      .eq("id_tipo_recurso", id_tipo_recurso)
      .single()
    if (error) throw error
    return data
  },

  async create({ nombre_recurso, descripcion }) {
    const { data, error } = await supabase.from("tipo_recurso").insert([{ nombre_recurso, descripcion }]).select()
    if (error) throw error
    return data[0]
  },

  async update(id_tipo_recurso, { nombre_recurso, descripcion }) {
    const { data, error } = await supabase
      .from("tipo_recurso")
      .update({ nombre_recurso, descripcion })
      .eq("id_tipo_recurso", id_tipo_recurso)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_tipo_recurso) {
    const { error } = await supabase.from("tipo_recurso").delete().eq("id_tipo_recurso", id_tipo_recurso)
    if (error) throw error
    return { message: "Tipo de recurso eliminado correctamente" }
  },
}
