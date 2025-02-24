const express = require('express');
const router = express.Router();
const horasTrabajadascontroller = require('../controllers/horasTrabajadasController');

router.get('/horasTrabajadas/:id', horasTrabajadascontroller.obtenerHorasTrabajadasPorId);

module.exports = router;
