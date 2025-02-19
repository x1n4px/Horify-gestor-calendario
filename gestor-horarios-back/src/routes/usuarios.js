const express = require('express');
const router = express.Router();
const db = require('../database/connection');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).send('Error al consultar la base de datos');
    }
    res.json(results);
  });
});

module.exports = router;
