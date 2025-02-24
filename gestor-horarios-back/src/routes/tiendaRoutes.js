const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');

// Ruta para obtener todas las tiendas
router.get('/tiendas', tiendaController.obtenerTiendas);

router.get('/tiendas/:id', tiendaController.obtenerTiendaPorId);

module.exports = router;
