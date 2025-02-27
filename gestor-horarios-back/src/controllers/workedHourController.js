const {pool} = require('../database/connection');

// Función para obtener un empleado por su ID
const getWorkedHoursById = async (req,res) => {
    try {
        const id = req.params.id; // empleado id
        // Obtener una conexión del pool

        // Ejecutar la consulta para obtener la tienda con el ID dado
        const [employee] = await pool.promise().query('select * from worked_hour ht where ht.employee_id = ?', [id]);

        const [contract] = await pool.promise().query('select c.* from employee e join contract c on e.contract_id = ?', [id]);

        // Retornar la tienda encontrada
        return res.json({
            ok: true,
            rows: employee,
            contract: contract[0]
        });
    } catch (error) {
        console.error('Error al obtener el empleado:', error);
        throw error;
    }
};


const saveWorkedHours = async (req, res) => {
    try {
        const items = req.body;

        console.log('Datos recibidos: ', items);

        for (const element of items) { // Iteramos directamente sobre items
            // Convertir fecha a objeto Date
            const correctDateFormat = new Date(element.fecha);

            // Formatear las horas de entrada y salida a HH:MM:SS
            const entryTime = formatTime(element.entry_time);
            const departureTime = formatTime(element.departure_time);

            // Convertir hora_entrada y hora_salida a objetos Date
            const entryTimeDate = convertToDate(entryTime);
            const departureTimeDate = convertToDate(departureTime);

            // Calcular la diferencia en horas
            const workedHours = (departureTimeDate - entryTimeDate) / 1000 / 60 / 60; // Diferencia en horas

            if (!element.id) {
                // Insertar un nuevo registro si no tiene ID
                const insertQuery = `
                    INSERT INTO worked_hour (employee_id, store_id, entry_time, departure_time, time, work_date)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                await pool.promise().query(insertQuery, [
                    element.employee_id,
                    element.store_id,
                    entryTime, // Usamos el formato correcto para hora_entrada
                    departureTime,  // Usamos el formato correcto para hora_salida
                    workedHours,
                    correctDateFormat // Guardamos la fecha en formato Date
                ]);

                console.log(`Registro insertado para empleado ${element.empleado_id}`);
            } else {
                // Actualizar si tiene ID
                const updateQuery = `
                    UPDATE worked_hour
                    SET employee_id = ?, store_id = ?, entry_time = ?, departure_time = ?, time = ?, work_date = ?
                    WHERE id = ?
                `;

                await pool.promise().query(updateQuery, [
                    element.employee_id,
                    element.store_id,
                    entryTime, // Usamos el formato correcto para hora_entrada
                    departureTime,  // Usamos el formato correcto para hora_salida
                    workedHours, // Usamos la diferencia calculada
                    correctDateFormat, // Guardamos la fecha en formato Date
                    element.id
                ]);

                console.log(`Registro actualizado con ID ${element.id}`);
            }
        }

        res.status(200).json({ message: 'Datos procesados correctamente' });
    } catch (error) {
        console.error('Error al guardar horas trabajadas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Función para convertir una cadena de tiempo en formato HH:MM a HH:MM:SS
const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    // Si no tiene segundos, los agregamos como 00
    return `${hours}:${minutes}:00`;
};

// Función para convertir una cadena de tiempo en formato HH:MM:SS a un objeto Date
const convertToDate = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
};


 








module.exports = {
    getWorkedHoursById,
    saveWorkedHours
};
