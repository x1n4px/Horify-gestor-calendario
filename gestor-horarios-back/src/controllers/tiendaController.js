const Tienda = require('../models/tiendaModel');
const Empleado = require('../models/empleadoModel');
const { db } = require('../database/connection');


const obtenerTiendas = async (req, res) => {
    try {
        const connection = await db(); // Obtienes una conexión del pool
        const [tiendas] = await connection.promise().query('SELECT * FROM tiendas'); // Ejecuta una consulta
        console.log(tiendas); // Muestra los resultados

        return res.json({
            ok: true,
            tiendas
        });

    } catch (error) {
        console.log('Error al obtener tiendas:', error);
    }
};


// Función para obtener una tienda por su ID
const obtenerTiendaPorId = async (req,res) => {
    try {
        const id = req.params.id;
        // Obtener una conexión del pool
        const connection = await db();

        // Ejecutar la consulta para obtener la tienda con el ID dado
        const [tienda] = await connection.promise().query('SELECT * FROM tiendas WHERE id = ?', [id]);

        if(tienda.length != 0) {
            const [empleados] = await connection.promise().query('SELECT * FROM empleados where tienda_id = ?', [id]);
            tienda[0].empleados = empleados;
        }

        // Retornar la tienda encontrada
        return res.json({
            ok: true,
            tienda: tienda[0]
        });
    } catch (error) {
        console.error('Error al obtener la tienda:', error);
        throw error;
    }
};





module.exports = {
    obtenerTiendas,
    obtenerTiendaPorId
};
