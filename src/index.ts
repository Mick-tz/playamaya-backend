require('dotenv').config();
const express = require('express');
// import { Request, Response, NextFunction } from 'express';
const sessions = require('client-sessions');
const csurf = require('csurf');
const exphbs = require('express-handlebars');
import path from 'path';

// PROD CONFIG
// const helmet = require('helmet'); // librería de manipulación del HTTP header para asegurar seguridad

// ROUTER'S IMPORTS
const indexRouter = require('./routers/index');
const usuariosRouter = require('./routers/usuarios');

// INIT
const app = express();
require('./db/mongoose');

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
 // motor de vistas
app.engine('.hbs', exphbs({
    extname: '.hbs', // extension del archivo
    layoutsDir: path.join(app.get('views'), 'layouts'), // dirección de la carpeta de layouts
    partialsDir: path.join(app.get('views'), 'partials'), // dirección de la carpeta de layouts
    helpers: require('./lib/helpers'),
    defaulLayout: 'main'
}));
app.set('view engine', '.hbs');

// MIDDLEWARE
// para serializar json 
app.use(express.json());
// para interpretar datos de formas de html 
app.use(express.urlencoded({extended: false}));
// para usar cookie sessions 
app.use(sessions({
    cookieName: 'session',
    secret: process.env.SESSIONS_CS,
    duration: 1000 * 60 * 60 * 24, // TODO: Decidir duración sesion, actual 24 hrs
    httpOnly: true,  // evita que js pueda accesar a la cookie
    // secure: true, // PROD REQUIRED!! agrega la cookie vía https unicamente
    // ephemeral: true // En caso que la sesión deba ser renovada al cerrar la aplicación 
}));
// para validar csrf tokens 
app.use(csurf())
// PROD REQUIRED!! para manejar seguridad del header
// app.use(helmet());

// ROUTES // TODO: Usar routers
app.use('/', indexRouter);
app.use('/api', usuariosRouter);

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


// SERVER
app.listen(app.get('port'), () => {
    console.log(`listening in port ${app.get('port')}`)
})

module.exports = app;