import { 
  findRolByName, 
  getAll, 
  getById, 
  create, 
  update, 
  remove 
} from "../models/rolModel.js";

export const obtenerRoles = async (req, res) => {
  try {
    const { data: roles, error } = await getAll();
    if (error) throw error;
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerRolPorId = async (req, res) => {
  try {
    const { data: rol, error } = await getById(req.params.id);
    if (error || !rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearRol = async (req, res) => {
  try {
    const { nombre_rol, descripcion } = req.body;
    
    if (!nombre_rol) {
      return res.status(400).json({ error: "El nombre del rol es obligatorio" });
    }

    // Verificar si ya existe
    const { data: rolExist } = await findRolByName(nombre_rol);
    if (rolExist) {
      return res.status(409).json({ error: "Rol ya existe" });
    }

    const { data: nuevoRol, error } = await create({ 
      nombre_rol, 
      descripcion 
    });
    if (error) throw error;
    
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarRol = async (req, res) => {
  try {
    const { nombre_rol, descripcion } = req.body;
    const { data: rolActualizado, error } = await update(req.params.id, {
      nombre_rol,
      descripcion,
    });
    if (error) throw error;
    res.status(200).json(rolActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarRol = async (req, res) => {
  try {
    const { data: result, error } = await remove(req.params.id);
    if (error) throw error;
    res.status(200).json({ message: "Rol eliminado", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
