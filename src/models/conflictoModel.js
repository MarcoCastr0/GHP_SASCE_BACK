// src/models/conflictoModel.js
import { supabase } from "../config/supabaseClient.js"

export const ConflictoModel = {
  async getAll() {
    const { data, error } = await supabase.from("conflicto").select("*, asignacion(*)")
    if (error) throw error
    return data
  },

  async getById(id_conflicto) {
    const { data, error } = await supabase
      .from("conflicto")
      .select("*, asignacion(*)")
      .eq("id_conflicto", id_conflicto)
      .single()
    if (error) throw error
    return data
  },

  async getByAsignacion(id_asignacion) {
    const { data, error } = await supabase.from("conflicto").select("*").eq("id_asignacion", id_asignacion)
    if (error) throw error
    return data
  },

  async getNoResueltos() {
    const { data, error } = await supabase
      .from("conflicto")
      .select("*, asignacion(*)")
      .eq("esta_resuelto", false)
      .order("severidad", { ascending: false })
    if (error) throw error
    return data
  },

  async getBySeveridad(severidad) {
    const { data, error } = await supabase
      .from("conflicto")
      .select("*, asignacion(*)")
      .eq("severidad", severidad)
      .eq("esta_resuelto", false)
    if (error) throw error
    return data
  },

  async create({ id_asignacion, tipo_conflicto, descripcion_conflicto, severidad }) {
    const { data, error } = await supabase
      .from("conflicto")
      .insert([{ id_asignacion, tipo_conflicto, descripcion_conflicto, severidad }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_conflicto, { tipo_conflicto, descripcion_conflicto, severidad, esta_resuelto, resuelto_en }) {
    const { data, error } = await supabase
      .from("conflicto")
      .update({ tipo_conflicto, descripcion_conflicto, severidad, esta_resuelto, resuelto_en })
      .eq("id_conflicto", id_conflicto)
      .select()
    if (error) throw error
    return data[0]
  },

  async marcarResuelto(id_conflicto) {
    const { data, error } = await supabase
      .from("conflicto")
      .update({ esta_resuelto: true, resuelto_en: new Date().toISOString() })
      .eq("id_conflicto", id_conflicto)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_conflicto) {
    const { error } = await supabase.from("conflicto").delete().eq("id_conflicto", id_conflicto)
    if (error) throw error
    return { message: "Conflicto eliminado correctamente" }
  },
}
