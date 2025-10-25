// src/models/salonModel.js
import { supabase } from "../config/supabaseClient.js"

export const SalonModel = {
  async getAll() {
    const { data, error } = await supabase.from("salon").select("*, edificio(*)")
    if (error) throw error
    return data
  },

  async getById(id_salon) {
    const { data, error } = await supabase.from("salon").select("*, edificio(*)").eq("id_salon", id_salon).single()
    if (error) throw error
    return data
  },

  async getByEdificio(id_edificio) {
    const { data, error } = await supabase.from("salon").select("*").eq("id_edificio", id_edificio)
    if (error) throw error
    return data
  },

  async getByCapacidadMinima(capacidad_minima) {
    const { data, error } = await supabase
      .from("salon")
      .select("*, edificio(*)")
      .gte("capacidad", capacidad_minima)
      .eq("esta_activo", true)
    if (error) throw error
    return data
  },

  async create({ codigo_salon, nombre_salon, id_edificio, numero_piso, capacidad, descripcion_ubicacion }) {
    const { data, error } = await supabase
      .from("salon")
      .insert([{ codigo_salon, nombre_salon, id_edificio, numero_piso, capacidad, descripcion_ubicacion }])
      .select()
    if (error) throw error
    return data[0]
  },

  async update(
    id_salon,
    { codigo_salon, nombre_salon, id_edificio, numero_piso, capacidad, descripcion_ubicacion, esta_activo },
  ) {
    const { data, error } = await supabase
      .from("salon")
      .update({ codigo_salon, nombre_salon, id_edificio, numero_piso, capacidad, descripcion_ubicacion, esta_activo })
      .eq("id_salon", id_salon)
      .select()
    if (error) throw error
    return data[0]
  },

  async remove(id_salon) {
    const { error } = await supabase.from("salon").delete().eq("id_salon", id_salon)
    if (error) throw error
    return { message: "Salón eliminado correctamente" }
  },
}
