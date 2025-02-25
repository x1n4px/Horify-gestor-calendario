const Tienda = require('../models/tiendaModel');
const Empleado = require('../models/empleadoModel');
const {pool} = require('../database/connection');

// Función para obtener un empleado por su ID
const obtenerHorasTrabajadasPorId = async (req,res) => {
    try {
        const id = req.params.id; // empleado id
        // Obtener una conexión del pool

        // Ejecutar la consulta para obtener la tienda con el ID dado
        const [empleado] = await pool.promise().query('select * from horas_trabajadas ht where ht.empleado_id = ?', [id]);

        const [contrato] = await pool.promise().query('select c.* from empleados e join contratos c on e.contrato_id = ?', [id]);

        // Retornar la tienda encontrada
        return res.json({
            ok: true,
            rows: empleado,
            contrato: contrato[0]
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
            const fechaFormatoCorrecto = new Date(element.fecha);

            // Formatear las horas de entrada y salida a HH:MM:SS
            const horaEntrada = formatTime(element.hora_entrada);
            const horaSalida = formatTime(element.hora_salida);

            // Convertir hora_entrada y hora_salida a objetos Date
            const horaEntradaDate = convertToDate(horaEntrada);
            const horaSalidaDate = convertToDate(horaSalida);

            // Calcular la diferencia en horas
            console.log(horaEntradaDate, horaSalidaDate);
            const horasTrabajadas = (horaSalidaDate - horaEntradaDate) / 1000 / 60 / 60; // Diferencia en horas
            console.log("Horas trabajadas: ", horasTrabajadas);

            if (!element.id) {
                // Insertar un nuevo registro si no tiene ID
                const insertQuery = `
                    INSERT INTO horas_trabajadas (empleado_id, tienda_id, hora_entrada, hora_salida, horas, fecha)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                await pool.promise().query(insertQuery, [
                    element.empleado_id,
                    element.tienda_id,
                    horaEntrada, // Usamos el formato correcto para hora_entrada
                    horaSalida,  // Usamos el formato correcto para hora_salida
                    horasTrabajadas,
                    fechaFormatoCorrecto // Guardamos la fecha en formato Date
                ]);

                console.log(`Registro insertado para empleado ${element.empleado_id}`);
            } else {
                // Actualizar si tiene ID
                const updateQuery = `
                    UPDATE horas_trabajadas
                    SET empleado_id = ?, tienda_id = ?, hora_entrada = ?, hora_salida = ?, horas = ?, fecha = ?
                    WHERE id = ?
                `;

                await pool.promise().query(updateQuery, [
                    element.empleado_id,
                    element.tienda_id,
                    horaEntrada, // Usamos el formato correcto para hora_entrada
                    horaSalida,  // Usamos el formato correcto para hora_salida
                    horasTrabajadas, // Usamos la diferencia calculada
                    fechaFormatoCorrecto, // Guardamos la fecha en formato Date
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
    obtenerHorasTrabajadasPorId,
    saveWorkedHours
};
