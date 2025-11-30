// src/models/periodoAcademicoModel.js
import { supabase } from "../config/supabaseClient.js";

export const getAllPeriodosAcademicos = async () => {
  const { data, error } = await supabase
    .from("periodo_academico")
    .select("id_periodo, nombre_periodo, codigo_periodo, fecha_inicio, fecha_fin, esta_activo")
    .order("fecha_inicio", { ascending: false });

  return { data, error };
};

export const getPeriodoActivo = async () => {
  const { data, error } = await supabase
    .from("periodo_academico")
    .select("id_periodo, nombre_periodo, codigo_periodo, fecha_inicio, fecha_fin")
    .eq("esta_activo", true)
    .single();

  return { data, error };
};
