const express = require('express');
const router = express.Router();
const vacationController = require('../controllers/vacationController');


router.get('/vacation/employee/:id', vacationController.getVacationByEmployeeId);

module.exports = router;
