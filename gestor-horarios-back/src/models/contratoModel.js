const mongoose = require('mongoose');

const EmpleadoSchema = mongoose.Schema({
    tipo_contrato: {
        type: String
    },
    horas_semanales: {
        type: int
    },
    horas_anuales: {
        type: int
    }

}, { collection: 'empleados' });

EmpleadoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = mongoose.model('Empleado', EmpleadoSchema);