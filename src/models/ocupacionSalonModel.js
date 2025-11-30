// src/models/ocupacionSalonModel.js
import { supabase } from "../config/supabaseClient.js";

// Obtener ocupaciones de un salón (con filtros opcionales)
export const getOcupacionesSalon = async (id_salon, filtros = {}) => {
  let query = supabase
    .from("ocupacion_salon")
    .select(
      `
      id_ocupacion,
      id_salon,
      id_periodo_academico,
      dia_semana,
      hora_inicio,
      hora_fin,
      motivo,
      fecha_creacion
    `
    )
    .eq("id_salon", id_salon)
    .order("dia_semana", { ascending: true })
    .order("hora_inicio", { ascending: true });

  if (filtros.id_periodo_academico) {
    query = query.eq("id_periodo_academico", filtros.id_periodo_academico);
  }

  if (filtros.dia_semana !== undefined && filtros.dia_semana !== null) {
    query = query.eq("dia_semana", filtros.dia_semana);
  }

  const { data, error } = await query;
  return { data, error };
};

// Crear nueva ocupación (bloqueo de horario)
export const createOcupacionSalon = async (ocupacionData) => {
  const { data, error } = await supabase
    .from("ocupacion_salon")
    .insert([ocupacionData])
    .select(
      `
      id_ocupacion,
      id_salon,
      id_periodo_academico,
      dia_semana,
      hora_inicio,
      hora_fin,
      motivo,
      fecha_creacion
    `
    )
    .single();

  return { data, error };
};

// Eliminar una ocupación
export const deleteOcupacionSalon = async (id_ocupacion) => {
  const { data, error } = await supabase
    .from("ocupacion_salon")
    .delete()
    .eq("id_ocupacion", id_ocupacion)
    .select(
      `
      id_ocupacion,
      id_salon,
      id_periodo_academico,
      dia_semana,
      hora_inicio,
      hora_fin,
      motivo
    `
    )
    .single();

  return { data, error };
};

// Verificar conflictos de horario con otras ocupaciones
export const checkConflictosOcupacion = async ({
  id_salon,
  id_periodo_academico,
  dia_semana,
  hora_inicio,
  hora_fin,
}) => {
  // Buscar ocupaciones que se solapen en el mismo salón, periodo y día
  const { data, error } = await supabase
    .from("ocupacion_salon")
    .select("id_ocupacion, hora_inicio, hora_fin, motivo")
    .eq("id_salon", id_salon)
    .eq("id_periodo_academico", id_periodo_academico)
    .eq("dia_semana", dia_semana)
    .or(
      `and(hora_inicio.lt.${hora_fin},hora_fin.gt.${hora_inicio})`
    );

  if (error) return { conflictos: [], error };

  return { conflictos: data || [], error: null };
};

// Verificar conflictos con asignaciones existentes (tabla asignacion)
export const checkConflictosAsignacion = async ({
  id_salon,
  id_periodo_academico,
  dia_semana,
  hora_inicio,
  hora_fin,
}) => {
  // Consulta asignaciones que usen franja_horaria del mismo día y solapen horario
  const { data, error } = await supabase
    .from("asignacion")
    .select(
      `
      id_asignacion,
      franja_horaria:id_franja_horaria(dia_semana, hora_inicio, hora_fin)
    `
    )
    .eq("id_salon", id_salon)
    .eq("id_periodo_academico", id_periodo_academico);

  if (error) return { conflictos: [], error };

  // Filtrar manualmente los que coincidan en día y solapen horario
  const conflictos = (data || []).filter((asig) => {
    const franja = asig.franja_horaria;
    if (!franja) return false;
    if (franja.dia_semana !== dia_semana) return false;
    // Solapamiento: hora_inicio < franja.hora_fin && hora_fin > franja.hora_inicio
    return hora_inicio < franja.hora_fin && hora_fin > franja.hora_inicio;
  });

  return { conflictos, error: null };
};
