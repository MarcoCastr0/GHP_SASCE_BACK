// src/models/recursoSalonModel.js
import { supabase } from "../config/supabaseClient.js"

export const RecursoSalonModel = {
  async getAll() {
    const { data, error } = await supabase.from("recurso_salon").select("*, salon(*), tipo_recurso(*)")
    if (error) throw error
    return data
  },

  async getById(id_recurso) {
    const { data, error } = await supabase
      .from("recurso_salon")
      .select("*, salon(*), tipo_recurso(*)")
      .eq("id_recurso", id_recurso)
      .single()
    if (error) throw error
    return data
  },

  async getBySalon(id_salon) {
    const { data, error } = await supabase.from("recurso_salon").select("*, tipo_recurso(*)").eq("id_salon", id_salon)
    if (error) throw error
    return data
  },

  async create({ id_salon, id_tipo_recurso, cantidad, notas }) {
    const { data, error } = await supabase
      .from("recurso_salon")
      .insert([{ id_salon, id_tipo_recurso, cantidad, notas }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_recurso, { cantidad, notas }) {
    const { data, error } = await supabase
      .from("recurso_salon")
      .update({ cantidad, notas })
      .eq("id_recurso", id_recurso)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_recurso) {
    const { error } = await supabase.from("recurso_salon").delete().eq("id_recurso", id_recurso)
    if (error) throw error
    return { message: "Recurso eliminado correctamente" }
  },
}
