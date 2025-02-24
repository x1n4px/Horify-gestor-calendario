const Tienda = require('../models/tiendaModel');
const Empleado = require('../models/empleadoModel');
const { db } = require('../database/connection');


// Función para obtener un empleado por su ID
const obtenerHorasTrabajadasPorId = async (req,res) => {
    try {
        const id = req.params.id; // empleado id
        // Obtener una conexión del pool
        const connection = await db();

        // Ejecutar la consulta para obtener la tienda con el ID dado
        const [empleado] = await connection.promise().query('select * from horas_trabajadas ht where ht.empleado_id = ?', [id]);

        const [contrato] = await connection.promise().query('select c.* from empleados e join contratos c on e.contrato_id = ?', [id]);

        // Retornar la tienda encontrada
        return res.json({
            ok: true,
            rows: empleado[0],
            contrato: contrato[0]
        });
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        throw error;
    }
};





module.exports = {
    obtenerHorasTrabajadasPorId
};
