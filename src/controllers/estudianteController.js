// src/controllers/estudianteController.js
import { supabase } from "../config/supabaseClient.js";

export const estudianteController = {
  // 🟢 Obtener todos los estudiantes
  getAll: async (req, res) => {
    try {
      const { data, error } = await supabase.from("estudiante").select("*");
      if (error) throw error;
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 🟡 Obtener estudiante por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const { data, error } = await supabase
        .from("estudiante")
        .select("*")
        .eq("id_estudiante", id)
        .single();

      if (error) throw error;
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 🟢 Crear nuevo estudiante
  create: async (req, res) => {
    try {
      const {
        id_usuario,
        numero_identificacion,
        correo_institucional,
        telefono,
        fecha_nacimiento,
        direccion,
        contacto_emergencia,
        telefono_emergencia,
        esta_activo,
      } = req.body;

      const { data, error } = await supabase
        .from("estudiante")
        .insert([
          {
            id_usuario,
            numero_identificacion,
            correo_institucional,
            telefono,
            fecha_nacimiento,
            direccion,
            contacto_emergencia,
            telefono_emergencia,
            esta_activo,
          },
        ])
        .select();

      if (error) throw error;
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 🟠 Actualizar estudiante
  update: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      const { data, error } = await supabase
        .from("estudiante")
        .update(updates)
        .eq("id_estudiante", id)
        .select();

      if (error) throw error;
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 🔴 Eliminar estudiante
  remove: async (req, res) => {
    const { id } = req.params;
    try {
      const { error } = await supabase
        .from("estudiante")
        .delete()
        .eq("id_estudiante", id);

      if (error) throw error;
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
