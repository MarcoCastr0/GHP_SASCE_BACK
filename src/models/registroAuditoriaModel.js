// src/models/registroAuditoriaModel.js
import { supabase } from "../config/supabaseClient.js"

export const RegistroAuditoriaModel = {
  async getAll(limit = 100) {
    const { data, error } = await supabase
      .from("registro_auditoria")
      .select("*, usuario(*)")
      .order("fecha_creacion", { ascending: false })
      .limit(limit)
    if (error) throw error
    return data
  },

  async getById(id_registro) {
    const { data, error } = await supabase
      .from("registro_auditoria")
      .select("*, usuario(*)")
      .eq("id_registro", id_registro)
      .single()
    if (error) throw error
    return data
  },

  async getByUsuario(id_usuario, limit = 50) {
    const { data, error } = await supabase
      .from("registro_auditoria")
      .select("*")
      .eq("id_usuario", id_usuario)
      .order("fecha_creacion", { ascending: false })
      .limit(limit)
    if (error) throw error
    return data
  },

  async getByEntidad(tipo_entidad, id_entidad) {
    const { data, error } = await supabase
      .from("registro_auditoria")
      .select("*, usuario(*)")
      .eq("tipo_entidad", tipo_entidad)
      .eq("id_entidad", id_entidad)
      .order("fecha_creacion", { ascending: false })
    if (error) throw error
    return data
  },

  async getByAccion(tipo_accion, limit = 100) {
    const { data, error } = await supabase
      .from("registro_auditoria")
      .select("*, usuario(*)")
      .eq("tipo_accion", tipo_accion)
      .order("fecha_creacion", { ascending: false })
      .limit(limit)
    if (error) throw error
    return data
  },

  async create({ id_usuario, tipo_accion, tipo_entidad, id_entidad, valores_antiguos, valores_nuevos }) {
    const { data, error } = await supabase
      .from("registro_auditoria")
      .insert([{ id_usuario, tipo_accion, tipo_entidad, id_entidad, valores_antiguos, valores_nuevos }])
      .select()
    if (error) throw error
    return data[0]
  },

  // No se permite actualizar o eliminar registros de auditoría por integridad
}
