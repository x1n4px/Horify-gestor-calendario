const { pool } = require('../database/connection');


// Función para obtener un empleado por su ID
const getEmployeeById = async (req,res) => {
    try {
        const id = req.params.id;
        // Obtener una conexión del pool

        // Ejecutar la consulta para obtener la tienda con el ID dado
        const [employee] = await pool.promise().query('select u.*, e.*, t.id as store_id, t.name as store_name from employee e join user u on u.id = e.user_id join store t on t.id = e.store_id where e.id  = ?', [id]);

        

        // Retornar la tienda encontrada
        return res.json({
            ok: true,
            employee: employee[0]
        });
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        throw error;
    }
};





module.exports = {
    getEmployeeById
};
