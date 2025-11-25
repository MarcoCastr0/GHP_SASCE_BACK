// src/models/userModel.js
import { supabase } from "../config/supabaseClient.js";

// Crear usuario
export const crearUsuario = async (usuario) => {
  // Validar que tenga rol asignado
  if (!usuario.id_rol) {
    throw new Error("El rol es obligatorio");
  }

  const { data, error } = await supabase
    .from("usuario")  // Cambiado de "usuarios" a "usuario"
    .insert([usuario])
    .select(`
      *,
      rol: id_rol (*)
    `);

  if (error) {
    // Manejar error de unicidad de correo
    if (error.code === '23505') {
      if (error.details.includes('correo')) {
        throw new Error("El correo electrónico ya está registrado");
      }
      if (error.details.includes('nombre_usuario')) {
        throw new Error("El nombre de usuario ya está en uso");
      }
    }
    throw error;
  }
  return data;
};

// Obtener todos los usuarios con información del rol
export const obtenerUsuarios = async () => {
  const { data, error } = await supabase
    .from("usuario")  // Cambiado de "usuarios" a "usuario"
    .select(`
      *,
      rol: id_rol (*)
    `)
    .order("id_usuario");
  if (error) throw error;
  return data;
};

// Obtener usuario por ID con rol
export const obtenerUsuarioPorId = async (id) => {
  const { data, error } = await supabase
    .from("usuario")  // Cambiado de "usuarios" a "usuario"
    .select(`
      *,
      rol: id_rol (*)
    `)
    .eq("id_usuario", id)
    .single();
  if (error) throw error;
  return data;
};

// Actualizar usuario
export const actualizarUsuario = async (id, nuevosDatos) => {
  // Validar que si se envía rol, sea válido
  if (nuevosDatos.id_rol && !nuevosDatos.id_rol) {
    throw new Error("El rol es obligatorio");
  }

  const { data, error } = await supabase
    .from("usuario")  // Cambiado de "usuarios" a "usuario"
    .update(nuevosDatos)
    .eq("id_usuario", id)
    .select(`
      *,
      rol: id_rol (*)
    `);

  if (error) {
    if (error.code === '23505') {
      if (error.details.includes('correo')) {
        throw new Error("El correo electrónico ya está registrado");
      }
      if (error.details.includes('nombre_usuario')) {
        throw new Error("El nombre de usuario ya está en uso");
      }
    }
    throw error;
  }
  return data;
};

// Eliminar usuario (solo desactiva, no elimina físicamente)
export const eliminarUsuario = async (id) => {
  const { data, error } = await supabase
    .from("usuario")  // Cambiado de "usuarios" a "usuario"
    .update({ esta_activo: false })
    .eq("id_usuario", id)
    .select();

  if (error) throw error;
  return { mensaje: "Usuario desactivado correctamente", usuario: data[0] };
};

// Activar usuario
export const activarUsuario = async (id) => {
  const { data, error } = await supabase
    .from("usuario")  // Cambiado de "usuarios" a "usuario"
    .update({ esta_activo: true })
    .eq("id_usuario", id)
    .select();

  if (error) throw error;
  return { mensaje: "Usuario activado correctamente", usuario: data[0] };
};