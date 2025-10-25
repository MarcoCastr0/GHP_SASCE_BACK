// src/controllers/especialidadProfesorController.js
export const especialidadProfesorController = {
  getAll: async (req, res) => {
    try {
      res.status(200).json({ message: "Lista de especialidades de profesores" });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener especialidades", error });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      res.status(200).json({ message: `Especialidad con ID ${id}` });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener especialidad", error });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre } = req.body;
      res.status(201).json({ message: "Especialidad creada", data: { nombre } });
    } catch (error) {
      res.status(500).json({ message: "Error al crear especialidad", error });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      res.status(200).json({ message: `Especialidad ${id} actualizada` });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar especialidad", error });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      res.status(200).json({ message: `Especialidad ${id} eliminada` });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar especialidad", error });
    }
  },
};
