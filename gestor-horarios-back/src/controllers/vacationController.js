const { pool } = require('../database/connection');


// Función para obtener un empleado por su ID
const getVacationByEmployeeId = async (req,res) => {
    try {
        const employeeId = req.params.id;
        // Obtener una conexión del pool

        // Ejecutar la consulta para obtener la tienda con el ID dado
        const [vacation] = await pool.promise().query('select * from vacation v WHERE v.employee_id = ?', [employeeId]);

        

        // Retornar la tienda encontrada
        return res.json(vacation);
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        throw error;
    }
};





module.exports = {
    getVacationByEmployeeId
};
