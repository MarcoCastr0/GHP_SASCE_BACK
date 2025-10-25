// src/models/restriccionModel.js
import { supabase } from "../config/supabaseClient.js"

export const RestriccionModel = {
  async getAll() {
    const { data, error } = await supabase.from("restriccion").select("*").eq("esta_activo", true)
    if (error) throw error
    return data
  },

  async getById(id_restriccion) {
    const { data, error } = await supabase.from("restriccion").select("*").eq("id_restriccion", id_restriccion).single()
    if (error) throw error
    return data
  },

  async getByRecurso(tipo_recurso, id_recurso) {
    const { data, error } = await supabase
      .from("restriccion")
      .select("*")
      .eq("tipo_recurso", tipo_recurso)
      .eq("id_recurso", id_recurso)
      .eq("esta_activo", true)
    if (error) throw error
    return data
  },

  async create({ tipo_restriccion, id_recurso, tipo_recurso, descripcion_restriccion, valido_desde, valido_hasta }) {
    const { data, error } = await supabase
      .from("restriccion")
      .insert([{ tipo_restriccion, id_recurso, tipo_recurso, descripcion_restriccion, valido_desde, valido_hasta }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_restriccion, { tipo_restriccion, descripcion_restriccion, valido_desde, valido_hasta, esta_activo }) {
    const { data, error } = await supabase
      .from("restriccion")
      .update({ tipo_restriccion, descripcion_restriccion, valido_desde, valido_hasta, esta_activo })
      .eq("id_restriccion", id_restriccion)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_restriccion) {
    const { error } = await supabase.from("restriccion").delete().eq("id_restriccion", id_restriccion)
    if (error) throw error
    return { message: "Restricción eliminada correctamente" }
  },
}
