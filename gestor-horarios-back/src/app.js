const express = require('express');
const app = express();
const usuariosRoutes = require('./routes/usuarios');

// Middleware y rutas
app.use(express.json());
app.use('/usuarios', usuariosRoutes);

module.exports = app;
