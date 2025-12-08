const express = require('express');
const router = express.Router();
const Platillo = require('../models/platillo');

// Listar platillos
router.get('/', async (req, res, next) => {
  try {
    const platillos = await Platillo.find().sort({ createdAt: -1 });
    res.json(platillos);
  } catch (err) { next(err); }
});

// Obtener por id
router.get('/:id', async (req, res, next) => {
  try {
    const p = await Platillo.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Platillo no encontrado' });
    res.json(p);
  } catch (err) { next(err); }
});

// Crear
router.post('/', async (req, res, next) => {
  try {
    const nuevo = new Platillo(req.body);
    const saved = await nuevo.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

// Actualizar
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Platillo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Platillo no encontrado' });
    res.json(updated);
  } catch (err) { next(err); }
});

// Eliminar
router.delete('/:id', async (req, res, next) => {
  try {
    const removed = await Platillo.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Platillo no encontrado' });
    res.json({ mensaje: 'Platillo eliminado' });
  } catch (err) { next(err); }
});

module.exports = router;
