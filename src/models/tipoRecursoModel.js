// src/models/tipoRecursoModel.js
import { supabase } from "../config/supabaseClient.js";

export const getAllTiposRecurso = async () => {
  const { data, error } = await supabase
    .from("tipo_recurso")
    .select("id_tipo_recurso, nombre_recurso, descripcion")
    .order("nombre_recurso", { ascending: true });

  return { data, error };
};
