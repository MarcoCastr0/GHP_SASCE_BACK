// src/controllers/periodoAcademicoController.js
import { PeriodoAcademicoModel } from "../models/periodoAcademicoModel.js";

export const PeriodoAcademicoController = {
  async list(req, res) {
    try {
      const data = await PeriodoAcademicoModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async get(req, res) {
    try {
      const data = await PeriodoAcademicoModel.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Período no encontrado" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const created = await PeriodoAcademicoModel.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await PeriodoAcademicoModel.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const r = await PeriodoAcademicoModel.remove(req.params.id);
      res.json(r);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
