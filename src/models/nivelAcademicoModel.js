// src/models/nivelAcademicoModel.js
import { supabase } from "../config/supabaseClient.js";

// Obtener todos los niveles académicos (para combos en el front)
export const getAllNivelesAcademicos = async () => {
  const { data, error } = await supabase
    .from("nivel_academico")
    .select("id_nivel, nombre_nivel, orden_nivel")
    .order("orden_nivel", { ascending: true });

  return { data, error };
};
