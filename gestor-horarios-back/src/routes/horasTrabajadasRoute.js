const express = require('express');
const router = express.Router();
const horasTrabajadascontroller = require('../controllers/horasTrabajadasController');

router.get('/hoursWorked/:id', horasTrabajadascontroller.obtenerHorasTrabajadasPorId);

module.exports = router;
