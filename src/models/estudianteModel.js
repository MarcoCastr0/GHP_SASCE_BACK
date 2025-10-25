// src/models/estudianteModel.js
import { supabase } from "../config/supabaseClient.js";

export const EstudianteModel = {
  async getAll() {
    const { data, error } = await supabase.from("estudiante").select("*").order("id_estudiante");
    if (error) throw error;
    return data;
  },

  async getById(id_estudiante) {
    const { data, error } = await supabase.from("estudiante").select("*").eq("id_estudiante", id_estudiante).single();
    if (error) throw error;
    return data;
  },

  async create(estudiante) {
    const { data, error } = await supabase.from("estudiante").insert([estudiante]).select().single();
    if (error) throw error;
    return data;
  },

  async update(id_estudiante, updates) {
    const { data, error } = await supabase
      .from("estudiante")
      .update(updates)
      .eq("id_estudiante", id_estudiante)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id_estudiante) {
    const { error } = await supabase.from("estudiante").delete().eq("id_estudiante", id_estudiante);
    if (error) throw error;
    return { message: "Estudiante eliminado correctamente" };
  },
};
