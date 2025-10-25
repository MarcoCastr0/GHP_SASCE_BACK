// src/models/tipoAsignacionModel.js
import { supabase } from "../config/supabaseClient.js"

export const TipoAsignacionModel = {
  async getAll() {
    const { data, error } = await supabase.from("tipo_asignacion").select("*")
    if (error) throw error
    return data
  },

  async getById(id_tipo_asignacion) {
    const { data, error } = await supabase
      .from("tipo_asignacion")
      .select("*")
      .eq("id_tipo_asignacion", id_tipo_asignacion)
      .single()
    if (error) throw error
    return data
  },

  async create({ nombre_tipo, descripcion }) {
    const { data, error } = await supabase.from("tipo_asignacion").insert([{ nombre_tipo, descripcion }]).select()
    if (error) throw error
    return data[0]
  },

  async update(id_tipo_asignacion, { nombre_tipo, descripcion }) {
    const { data, error } = await supabase
      .from("tipo_asignacion")
      .update({ nombre_tipo, descripcion })
      .eq("id_tipo_asignacion", id_tipo_asignacion)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_tipo_asignacion) {
    const { error } = await supabase.from("tipo_asignacion").delete().eq("id_tipo_asignacion", id_tipo_asignacion)
    if (error) throw error
    return { message: "Tipo de asignación eliminado correctamente" }
  },
}
