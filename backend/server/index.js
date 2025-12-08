// backend placeholder
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const clientesRouter = require('./routes/clientes');
const platillosRouter = require('./routes/platillos');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/clientes', clientesRouter);
app.use('/api/platillos', platillosRouter);

// Ruta principal
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Restaurante Delicia - MERN', status: 'OK', version: '1.0.0' });
});

// Manejo errores básico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurante-delicia';
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Backend en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error iniciando servidor:', err);
    process.exit(1);
  }
}

start();
