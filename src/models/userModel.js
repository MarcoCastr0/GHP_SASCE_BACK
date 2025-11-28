// src/models/userModel.js
import { supabase } from "../config/supabaseClient.js";

// ---------- FUNCIONES BASE (CRUD / uso general) ----------

// Crear usuario completo (si lo usas en otros módulos)
export const crearUsuario = async (usuario) => {
  if (!usuario.id_rol) {
    throw new Error("El rol es obligatorio");
  }

  const { data, error } = await supabase
    .from("usuario")
    .insert([usuario])
    .select("*");

  if (error) {
    if (error.code === "23505") {
      if (error.details?.includes("correo")) {
        throw new Error("El correo electrónico ya está registrado");
      }
      if (error.details?.includes("nombre_usuario")) {
        throw new Error("El nombre de usuario ya está en uso");
      }
    }
    throw error;
  }
  return data;
};

export const obtenerUsuarios = async () => {
  const { data, error } = await supabase
    .from("usuario")
    .select("*")
    .order("id_usuario");
  if (error) throw error;
  return data;
};

export const obtenerUsuarioPorId = async (id) => {
  const { data, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("id_usuario", id)
    .single();
  if (error) throw error;
  return data;
};

export const actualizarUsuario = async (id, nuevosDatos) => {
  const { data, error } = await supabase
    .from("usuario")
    .update(nuevosDatos)
    .eq("id_usuario", id)
    .select("*");

  if (error) {
    if (error.code === "23505") {
      if (error.details?.includes("correo")) {
        throw new Error("El correo electrónico ya está registrado");
      }
      if (error.details?.includes("nombre_usuario")) {
        throw new Error("El nombre de usuario ya está en uso");
      }
    }
    throw error;
  }
  return data;
};

export const eliminarUsuario = async (id) => {
  const { data, error } = await supabase
    .from("usuario")
    .update({ esta_activo: false })
    .eq("id_usuario", id)
    .select("*");

  if (error) throw error;
  return { mensaje: "Usuario desactivado correctamente", usuario: data?.[0] };
};

export const activarUsuario = async (id) => {
  const { data, error } = await supabase
    .from("usuario")
    .update({ esta_activo: true })
    .eq("id_usuario", id)
    .select("*");

  if (error) throw error;
  return { mensaje: "Usuario activado correctamente", usuario: data?.[0] };
};

// ---------- FUNCIONES ESPECÍFICAS PARA CU1 / JWT ----------

// Para login (buscar por correo y traer hash_contrasena)
export const findUserByEmail = async (correo) => {
  const { data, error } = await supabase
    .from("usuario")
    .select("id_usuario, nombre_usuario, correo, hash_contrasena, id_rol, esta_activo")
    .eq("correo", correo)
    .single();
  return { data, error };
};

// Para listado básico en módulo admin
export const getAllUsersBasic = async () => {
  const { data, error } = await supabase
    .from("usuario")
    .select("id_usuario, nombre_usuario, correo, id_rol, esta_activo, fecha_creacion")
    .order("fecha_creacion", { ascending: false });
  return { data, error };
};

// Para creación desde CU1 (admin + JWT)
export const createUserBasic = async (userData) => {
  const { data, error } = await supabase
    .from("usuario")
    .insert([userData])
    .select("id_usuario, nombre_usuario, correo, id_rol, esta_activo")
    .single();
  return { data, error };
};
