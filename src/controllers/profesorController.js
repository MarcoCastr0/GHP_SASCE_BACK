// src/controllers/profesorController.js
export const profesorController = {
  getAll: async (req, res) => {
    try {
      res.status(200).json({ message: "Lista de profesores" });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener profesores", error });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      res.status(200).json({ message: `Profesor con ID ${id}` });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener profesor", error });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, correo } = req.body;
      res.status(201).json({ message: "Profesor creado", data: { nombre, correo } });
    } catch (error) {
      res.status(500).json({ message: "Error al crear profesor", error });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      res.status(200).json({ message: `Profesor ${id} actualizado` });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar profesor", error });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      res.status(200).json({ message: `Profesor ${id} eliminado` });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar profesor", error });
    }
  },
};
