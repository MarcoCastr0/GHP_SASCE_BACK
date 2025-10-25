// src/models/rolModel.js
import { supabase } from "../config/supabaseClient.js";

export const RolModel = {
  // Obtener todos los roles
  async getAll() {
    const { data, error } = await supabase.from("rol").select("*");
    if (error) throw error;
    return data;
  },

  // Obtener un rol por ID
  async getById(id_rol) {
    const { data, error } = await supabase
      .from("rol")
      .select("*")
      .eq("id_rol", id_rol)
      .single();
    if (error) throw error;
    return data;
  },

  // Crear un nuevo rol
  async create({ nombre_rol, descripcion }) {
    const { data, error } = await supabase
      .from("rol")
      .insert([{ nombre_rol, descripcion }])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Actualizar un rol existente
  async update(id_rol, { nombre_rol, descripcion }) {
    const { data, error } = await supabase
      .from("rol")
      .update({ nombre_rol, descripcion })
      .eq("id_rol", id_rol)
      .select();
    if (error) throw error;
    return data[0];
  },

  // Eliminar un rol
  async remove(id_rol) {
    const { error } = await supabase.from("rol").delete().eq("id_rol", id_rol);
    if (error) throw error;
    return { message: "Rol eliminado correctamente" };
  },
};
