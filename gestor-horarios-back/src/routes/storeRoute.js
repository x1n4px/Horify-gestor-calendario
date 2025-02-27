const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Ruta para obtener todas las tiendas
router.get('/store', storeController.getStores);

router.get('/store/:id', storeController.getStoresById);


module.exports = router;
