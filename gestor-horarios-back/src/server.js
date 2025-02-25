const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const tiendaRoutes = require('./routes/tiendaRoutes');
const empleadoRoutes = require('./routes/empleadoRoute');
const horasTrabajadasRoutes = require('./routes/horasTrabajadasRoute')

// Cargar las variables de entorno
dotenv.config();
app.use(cors());
// Usar las rutas de tienda
app.use('/api', tiendaRoutes);
app.use('/api', empleadoRoutes)
app.use('/api', horasTrabajadasRoutes)

// Iniciar el servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
