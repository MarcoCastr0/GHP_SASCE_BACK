// src/models/rolModel.js
import { supabase } from "../config/supabaseClient.js";

export const RolModel = {
  async getAll() {
    const { data, error } = await supabase
      .from("rol")
      .select("*")
      .order("id_rol");
    if (error) throw error;
    return data;
  },

  async getById(id_rol) {
    const { data, error } = await supabase
      .from("rol")
      .select("*")
      .eq("id_rol", id_rol)
      .single();
    if (error) throw error;
    return data;
  },

  async getByNombre(nombre_rol) {
    const { data, error } = await supabase
      .from("rol")
      .select("*")
      .eq("nombre_rol", nombre_rol)
      .single();
    if (error) throw error;
    return data;
  },

  async create(rol) {
    const { data, error } = await supabase
      .from("rol")
      .insert([rol])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id_rol, updates) {
    const { data, error } = await supabase
      .from("rol")
      .update(updates)
      .eq("id_rol", id_rol)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id_rol) {
    const { error } = await supabase
      .from("rol")
      .delete()
      .eq("id_rol", id_rol);
    if (error) throw error;
    return { message: "Rol eliminado correctamente" };
  },
};