require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );

// Rutas
app.use( '/votos/usuarios', require('./routes/usuarios') );
app.use( '/votos/todo', require('./routes/busquedas') );
app.use( '/votos/login', require('./routes/auth') );
app.use( '/votos/upload', require('./routes/uploads') );
app.use( '/votos/votantes', require('./routes/votantes') );
app.use( '/votos/donaciones', require('./routes/donaciones') );
app.use( '/votos/transporte', require('./routes/transporte') );
app.use( '/votos/donacionesPublicas', require('./routes/donacionespublicas') );
app.use( '/votos/rendimiento', require('./routes/rendimientosinver') );
app.use( '/votos/actospublicos', require('./routes/actospublicos') );
// Lo último
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

