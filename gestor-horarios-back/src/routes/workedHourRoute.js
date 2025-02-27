const express = require('express');
const router = express.Router();
const workedHourcontroller = require('../controllers/workedHourController');

router.get('/hoursWorked/:id', workedHourcontroller.getWorkedHoursById);

router.post('/hoursWorked', workedHourcontroller.saveWorkedHours);

router.get('/hoursWorked/date/:day', workedHourcontroller.getWorkedHoursByDay);

module.exports = router;
