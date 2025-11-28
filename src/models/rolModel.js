// src/models/rolModel.js
import { supabase } from "../config/supabaseClient.js";

export const findRolByName = async (nombre_rol) => {
  const { data, error } = await supabase
    .from("rol")
    .select("*")
    .eq("nombre_rol", nombre_rol)
    .single();
  return { data, error };
};

export const getAll = async () => {
  const { data, error } = await supabase
    .from("rol")
    .select("*")
    .order("fecha_creacion", { ascending: false });
  return { data, error };
};

export const getById = async (id_rol) => {
  const { data, error } = await supabase
    .from("rol")
    .select("*")
    .eq("id_rol", id_rol)
    .single();
  return { data, error };
};

export const create = async (rolData) => {
  const { data, error } = await supabase
    .from("rol")
    .insert([rolData])
    .select()
    .single();
  return { data, error };
};

export const update = async (id_rol, rolData) => {
  const { data, error } = await supabase
    .from("rol")
    .update(rolData)
    .eq("id_rol", id_rol)
    .select()
    .single();
  return { data, error };
};

export const remove = async (id_rol) => {
  const { data, error } = await supabase
    .from("rol")
    .delete()
    .eq("id_rol", id_rol);
  return { data, error };
};
