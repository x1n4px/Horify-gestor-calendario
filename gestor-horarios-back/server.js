require('dotenv').config(); // Cargar variables de entorno
const app = require('./src/app');
const port = 3000; 


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
