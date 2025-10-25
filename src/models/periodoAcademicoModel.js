// src/models/periodoAcademicoModel.js
import { supabase } from "../config/supabaseClient.js";

export const PeriodoAcademicoModel = {
  async getAll() {
    const { data, error } = await supabase.from("periodo_academico").select("*").order("id_periodo");
    if (error) throw error;
    return data;
  },

  async getById(id_periodo) {
    const { data, error } = await supabase.from("periodo_academico").select("*").eq("id_periodo", id_periodo).single();
    if (error) throw error;
    return data;
  },

  async create(periodo) {
    const { data, error } = await supabase.from("periodo_academico").insert([periodo]).select().single();
    if (error) throw error;
    return data;
  },

  async update(id_periodo, updates) {
    const { data, error } = await supabase
      .from("periodo_academico")
      .update(updates)
      .eq("id_periodo", id_periodo)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id_periodo) {
    const { error } = await supabase.from("periodo_academico").delete().eq("id_periodo", id_periodo);
    if (error) throw error;
    return { message: "Período académico eliminado correctamente" };
  },
};
