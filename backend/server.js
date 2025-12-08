const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/mensaje', (req, res) => {
  res.json({ mensaje: "Hola desde el backend 👋" });
});

app.listen(5000, () => {
  console.log("Servidor backend corriendo en http://localhost:5000");
});
