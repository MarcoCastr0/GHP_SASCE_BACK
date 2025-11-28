// src/models/auditoriaModel.js
import { supabase } from "../config/supabaseClient.js";

export const registrarAuditoria = async ({
  id_usuario,
  tipo_accion,
  tipo_entidad,
  id_entidad,
  valores_antiguos = null,
  valores_nuevos = null,
}) => {
  const { data, error } = await supabase
    .from("registro_auditoria")
    .insert([
      {
        id_usuario,
        tipo_accion,
        tipo_entidad,
        id_entidad,
        valores_antiguos,
        valores_nuevos,
      },
    ])
    .select("*")
    .single();

  return { data, error };
};
