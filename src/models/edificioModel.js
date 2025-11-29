// src/models/edificioModel.js
import { supabase } from "../config/supabaseClient.js";

export const getAllEdificios = async () => {
  const { data, error } = await supabase
    .from("edificio")
    .select("id_edificio, nombre_edificio, codigo_edificio, direccion")
    .order("nombre_edificio", { ascending: true });

  return { data, error };
};
