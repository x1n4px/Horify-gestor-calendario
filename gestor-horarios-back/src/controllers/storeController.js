const { pool } = require('../database/connection'); // Importamos el pool correctamente

const getStores = async (req, res) => {
    try {
        const [stores] = await pool.promise().query('SELECT * FROM store');

        return res.json({
            ok: true,
            stores
        });
    } catch (error) {
        console.error('Error al obtener tiendas:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error al obtener tiendas'
        });
    }
};

const getStoresById = async (req, res) => {
    try {
        const id = req.params.id;
        const [store] = await pool.promise().query('SELECT * FROM store WHERE id = ?', [id]);

        if (store.length !== 0) {
            const [employees] = await pool.promise().query('SELECT * FROM employee WHERE store_id = ?', [id]);
            store[0].employee = employees;
        }

        return res.json({
            ok: true,
            store: store.length ? store[0] : null
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
    getStores,
    getStoresById
};
