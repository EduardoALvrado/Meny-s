const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: { type: String },
  notas: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
