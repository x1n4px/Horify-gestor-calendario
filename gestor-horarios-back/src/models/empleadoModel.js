const mongoose = require('mongoose');

const EmpleadoSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    tienda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tienda'
    },
    contrato: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contrato'
    },
    rol: {
        type: String
    },
    fecha_ingreso: {
        type: Date
    }

}, { collection: 'empleados' });

EmpleadoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = mongoose.model('Empleado', EmpleadoSchema);