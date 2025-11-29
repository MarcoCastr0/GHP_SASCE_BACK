// src/models/salonModel.js
import { supabase } from "../config/supabaseClient.js";

// Listar salones
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
      fecha_creacion
    `
    )
    .order("codigo_salon", { ascending: true });

  return { data, error };
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

// Asociar recursos a un salón
export const createRecursosSalon = async (id_salon, recursos) => {
  // recursos: array de { id_tipo_recurso, cantidad, notas }
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
