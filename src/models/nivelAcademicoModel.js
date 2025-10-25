// src/models/nivelAcademicoModel.js
import { supabase } from "../config/supabaseClient.js"

export const NivelAcademicoModel = {
  async getAll() {
    const { data, error } = await supabase.from("nivel_academico").select("*").order("orden_nivel", { ascending: true })
    if (error) throw error
    return data
  },

  async getById(id_nivel) {
    const { data, error } = await supabase.from("nivel_academico").select("*").eq("id_nivel", id_nivel).single()
    if (error) throw error
    return data
  },

  async create({ nombre_nivel, orden_nivel }) {
    const { data, error } = await supabase.from("nivel_academico").insert([{ nombre_nivel, orden_nivel }]).select()
    if (error) throw error
    return data[0]
  },

  async update(id_nivel, { nombre_nivel, orden_nivel }) {
    const { data, error } = await supabase
      .from("nivel_academico")
      .update({ nombre_nivel, orden_nivel })
      .eq("id_nivel", id_nivel)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_nivel) {
    const { error } = await supabase.from("nivel_academico").delete().eq("id_nivel", id_nivel)
    if (error) throw error
    return { message: "Nivel académico eliminado correctamente" }
  },
}
