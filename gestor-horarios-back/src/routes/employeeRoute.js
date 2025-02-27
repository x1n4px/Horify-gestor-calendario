const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');


router.get('/employee/:id', employeeController.getEmployeeById);

module.exports = router;
