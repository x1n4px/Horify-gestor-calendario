const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');


router.get('/empleado/:id', empleadoController.obtenerEmpleadoPorId);

module.exports = router;
