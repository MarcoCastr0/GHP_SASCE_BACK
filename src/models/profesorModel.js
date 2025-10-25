// src/models/profesorModel.js
import { supabase } from "../config/supabaseClient.js";

export const ProfesorModel = {
  async getAll() {
    const { data, error } = await supabase.from("profesor").select("*").order("id_profesor");
    if (error) throw error;
    return data;
  },

  async getById(id_profesor) {
    const { data, error } = await supabase.from("profesor").select("*").eq("id_profesor", id_profesor).single();
    if (error) throw error;
    return data;
  },

  async create(profesor) {
    const { data, error } = await supabase.from("profesor").insert([profesor]).select().single();
    if (error) throw error;
    return data;
  },

  async update(id_profesor, updates) {
    const { data, error } = await supabase
      .from("profesor")
      .update(updates)
      .eq("id_profesor", id_profesor)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id_profesor) {
    const { error } = await supabase.from("profesor").delete().eq("id_profesor", id_profesor);
    if (error) throw error;
    return { message: "Profesor eliminado correctamente" };
  },
};
