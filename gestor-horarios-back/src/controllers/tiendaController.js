const Tienda = require('../models/tiendaModel');
const Empleado = require('../models/empleadoModel');
const { pool } = require('../database/connection'); // Importamos el pool correctamente

const obtenerTiendas = async (req, res) => {
    try {
        const [tiendas] = await pool.promise().query('SELECT * FROM tiendas');
        console.log(tiendas);

        return res.json({
            ok: true,
            tiendas
        });
    } catch (error) {
        console.error('Error al obtener tiendas:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener tiendas'
        });
    }
};

const obtenerTiendaPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const [tienda] = await pool.promise().query('SELECT * FROM tiendas WHERE id = ?', [id]);

        if (tienda.length !== 0) {
            const [empleados] = await pool.promise().query('SELECT * FROM empleados WHERE tienda_id = ?', [id]);
            tienda[0].empleados = empleados;
        }

        return res.json({
            ok: true,
            tienda: tienda.length ? tienda[0] : null
        });
    } catch (error) {
        console.error('Error al obtener la tienda:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener la tienda'
        });
    }
};

module.exports = {
    obtenerTiendas,
    obtenerTiendaPorId
};
