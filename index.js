const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// console.log(process.env);
//?Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//#region  Directorio publico
app.use(express.static('public'));

//#endregion
//Lectura y parseo del body
app.use(express.json());
//#region Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//TODO CRUD: Eventos

//#endregion

//#region Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
//#endregion
