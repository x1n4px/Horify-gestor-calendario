const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de entorno


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = db;
