// src/models/salonModel.js
import { supabase } from "../config/supabaseClient.js";

// Listar salones con información del edificio
export const getAllSalones = async () => {
  const { data, error } = await supabase
    .from("salon")
    .select(
      `
      id_salon,
      codigo_salon,
      nombre_salon,
      id_edificio,
      numero_piso,
      capacidad,
      descripcion_ubicacion,
      esta_activo,
      fecha_creacion,
      edificio:id_edificio(
        id_edificio,
        nombre_edificio,
        codigo_edificio
      )
    `
    )
    .order("codigo_salon", { ascending: true });

  return { data, error };
};

// Obtener un salón por ID con recursos
export const getSalonById = async (id_salon) => {
  const { data, error } = await supabase
    .from("salon")
    .select(
      `
      id_salon,
      codigo_salon,
      nombre_salon,
      id_edificio,
      numero_piso,
      capacidad,
      descripcion_ubicacion,
      esta_activo,
      fecha_creacion,
      fecha_actualizacion,
      edificio:id_edificio(
        id_edificio,
        nombre_edificio,
        codigo_edificio
      )
    `
    )
    .eq("id_salon", id_salon)
    .single();

  if (error) return { data: null, error };

  // Obtener recursos del salón
  const { data: recursos } = await supabase
    .from("recurso_salon")
    .select(
      `
      id_recurso,
      id_tipo_recurso,
      cantidad,
      notas,
      tipo_recurso:id_tipo_recurso(
        id_tipo_recurso,
        nombre_recurso,
        descripcion
      )
    `
    )
    .eq("id_salon", id_salon);

  return {
    data: {
      ...data,
      recursos: recursos || [],
    },
    error: null,
  };
};

// Crear salón
export const createSalon = async (salonData) => {
  const { data, error } = await supabase
    .from("salon")
    .insert([salonData])
    .select(
      `
      id_salon,
      codigo_salon,
      nombre_salon,
      id_edificio,
      numero_piso,
      capacidad,
      descripcion_ubicacion,
      esta_activo,
      fecha_creacion
    `
    )
    .single();

  if (error) {
    if (error.code === "23505") {
      if (error.details?.includes("codigo_salon")) {
        return {
          data: null,
          error: { message: "El código del salón ya está registrado" },
        };
      }
    }
    return { data: null, error };
  }

  return { data, error: null };
};

// Actualizar salón
export const updateSalon = async (id_salon, nuevosDatos) => {
  const { data, error } = await supabase
    .from("salon")
    .update({
      ...nuevosDatos,
      fecha_actualizacion: new Date().toISOString(),
    })
    .eq("id_salon", id_salon)
    .select(
      `
      id_salon,
      codigo_salon,
      nombre_salon,
      id_edificio,
      numero_piso,
      capacidad,
      descripcion_ubicacion,
      esta_activo,
      fecha_actualizacion
    `
    )
    .single();

  if (error) {
    if (error.code === "23505" && error.details?.includes("codigo_salon")) {
      return {
        data: null,
        error: { message: "El código del salón ya está registrado" },
      };
    }
    return { data: null, error };
  }

  return { data, error: null };
};

// Desactivar salón (baja lógica)
export const desactivarSalon = async (id_salon) => {
  const { data, error } = await supabase
    .from("salon")
    .update({
      esta_activo: false,
      fecha_actualizacion: new Date().toISOString(),
    })
    .eq("id_salon", id_salon)
    .select(
      `
      id_salon,
      codigo_salon,
      nombre_salon,
      esta_activo
    `
    )
    .single();

  return { data, error };
};

// Verificar si hay asignaciones activas para el salón
export const countAsignacionesActivasPorSalon = async (id_salon) => {
  const { count, error } = await supabase
    .from("asignacion")
    .select("id_asignacion", { count: "exact", head: true })
    .eq("id_salon", id_salon)
    .eq("esta_activa", true);

  return { count: count || 0, error };
};

// Asociar recursos a un salón
export const createRecursosSalon = async (id_salon, recursos) => {
  if (!recursos || recursos.length === 0) {
    return { data: [], error: null };
  }

  const payload = recursos.map((r) => ({
    id_salon,
    id_tipo_recurso: r.id_tipo_recurso,
    cantidad: r.cantidad ?? 1,
    notas: r.notas ?? null,
  }));

  const { data, error } = await supabase
    .from("recurso_salon")
    .insert(payload)
    .select(
      `
      id_recurso,
      id_salon,
      id_tipo_recurso,
      cantidad,
      notas
    `
    );

  return { data, error };
};

// Eliminar recursos de un salón
export const deleteRecursosBySalon = async (id_salon) => {
  const { error } = await supabase
    .from("recurso_salon")
    .delete()
    .eq("id_salon", id_salon);

  return { error };
};