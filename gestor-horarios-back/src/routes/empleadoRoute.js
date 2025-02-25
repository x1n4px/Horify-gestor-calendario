const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');


router.get('/employee/:id', empleadoController.obtenerEmpleadoPorId);

module.exports = router;
