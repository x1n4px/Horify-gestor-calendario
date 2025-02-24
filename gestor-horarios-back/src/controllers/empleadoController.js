const Tienda = require('../models/tiendaModel');
const Empleado = require('../models/empleadoModel');
const { db } = require('../database/connection');


// Función para obtener un empleado por su ID
const obtenerEmpleadoPorId = async (req,res) => {
    try {
        const id = req.params.id;
        // Obtener una conexión del pool
        const connection = await db();

        // Ejecutar la consulta para obtener la tienda con el ID dado
        const [empleado] = await connection.promise().query('SELECT * FROM empleados WHERE id = ?', [id]);

        

        // Retornar la tienda encontrada
        return res.json({
            ok: true,
            empleado: empleado[0]
        });
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        throw error;
    }
};





module.exports = {
    obtenerEmpleadoPorId
};
