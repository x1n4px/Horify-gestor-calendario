const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');

// Ruta para obtener todas las tiendas
router.get('/shop', tiendaController.obtenerTiendas);

router.get('/shop/:id', tiendaController.obtenerTiendaPorId);


module.exports = router;
