const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

// GET /api/clientes - listar
router.get('/', async (req, res, next) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    res.json(clientes);
  } catch (err) { next(err); }
});

// GET /api/clientes/:id - obtener
router.get('/:id', async (req, res, next) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) { next(err); }
});

// POST /api/clientes - crear
router.post('/', async (req, res, next) => {
  try {
    const nuevo = new Cliente(req.body);
    const saved = await nuevo.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

// PUT /api/clientes/:id - actualizar
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE /api/clientes/:id - eliminar
router.delete('/:id', async (req, res, next) => {
  try {
    const removed = await Cliente.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (err) { next(err); }
});

module.exports = router;