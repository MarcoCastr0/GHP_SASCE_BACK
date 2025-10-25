// src/models/edificioModel.js
import { supabase } from "../config/supabaseClient.js"

export const EdificioModel = {
  async getAll() {
    const { data, error } = await supabase.from("edificio").select("*")
    if (error) throw error
    return data
  },

  async getById(id_edificio) {
    const { data, error } = await supabase.from("edificio").select("*").eq("id_edificio", id_edificio).single()
    if (error) throw error
    return data
  },

  async create({ nombre_edificio, codigo_edificio, direccion }) {
    const { data, error } = await supabase
      .from("edificio")
      .insert([{ nombre_edificio, codigo_edificio, direccion }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(id_edificio, { nombre_edificio, codigo_edificio, direccion }) {
    const { data, error } = await supabase
      .from("edificio")
      .update({ nombre_edificio, codigo_edificio, direccion })
      .eq("id_edificio", id_edificio)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_edificio) {
    const { error } = await supabase.from("edificio").delete().eq("id_edificio", id_edificio)
    if (error) throw error
    return { message: "Edificio eliminado correctamente" }
  },
}
