const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const storeRoute = require('./routes/storeRoute');
const employeeRoute = require('./routes/employeeRoute');
const workedHourRoute = require('./routes/workedHourRoute')

// Cargar las variables de entorno
dotenv.config();
app.use(express.json()); // Middleware para procesar JSON
app.use(cors());
// Usar las rutas de tienda
app.use('/api', storeRoute);
app.use('/api', employeeRoute)
app.use('/api', workedHourRoute)

// Iniciar el servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
