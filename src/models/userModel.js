import { supabase } from "../config/supabaseClient.js";

// Crear usuario
export const crearUsuario = async (usuario) => {
  const { data, error } = await supabase
    .from("usuarios")
    .insert([usuario])
    .select();

  if (error) throw error;
  return data;
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  const { data, error } = await supabase.from("usuarios").select("*");
  if (error) throw error;
  return data;
};

// Actualizar usuario
export const actualizarUsuario = async (id, nuevosDatos) => {
  const { data, error } = await supabase
    .from("usuarios")
    .update(nuevosDatos)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

// Eliminar usuario
export const eliminarUsuario = async (id) => {
  const { error } = await supabase.from("usuarios").delete().eq("id", id);
  if (error) throw error;
  return { mensaje: "Usuario eliminado correctamente" };
};
