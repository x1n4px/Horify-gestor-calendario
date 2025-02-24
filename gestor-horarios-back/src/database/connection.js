const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de entorno

// Crear un pool de conexiones para mejor rendimiento
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,  // Número máximo de conexiones simultáneas
    queueLimit: 0
});

// Usar Promise para hacer consultas asíncronas
const db = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('Error en la conexión a la base de datos:', err);
                reject(err);
            } else {
                console.log('Conexión exitosa a la base de datos');
                resolve(connection);
                connection.release(); // Liberar la conexión una vez que no se necesite
            }
        });
    });
};

module.exports = { db };
