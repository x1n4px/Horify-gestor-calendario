const Tienda = require('../models/tiendaModel');
const Empleado = require('../models/empleadoModel');
const { pool } = require('../database/connection');


// Función para obtener un empleado por su ID
const obtenerEmpleadoPorId = async (req,res) => {
    try {
        const id = req.params.id;
        // Obtener una conexión del pool

        // Ejecutar la consulta para obtener la tienda con el ID dado
        const [empleado] = await pool.promise().query('select u.*, e.*, t.id as tienda_id, t.nombre as tienda_nombre from empleados e join usuarios u on u.id = e.usuario_id join tiendas t on t.id = e.tienda_id where e.id  = ?', [id]);

        

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
