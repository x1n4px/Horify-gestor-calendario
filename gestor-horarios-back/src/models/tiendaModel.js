const mongoose = require('mongoose');

const TiendaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String
    },
    telefono: {
        type: String
    },
    fecha_creacion: {
        type: Date
    },
    empleados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empleado'
    }]

}, { collection: 'tiendas' });

TiendaSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = mongoose.model('Tienda', TiendaSchema);