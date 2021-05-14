require('dotenv').config()
const express = require('express');
import { Request, Response, NextFunction } from 'express';
const exphbs = require('express-handlebars');
import path from 'path';

// INIT
const app = express()

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
 // motor de vistas
app.engine('.hbs', exphbs({
    extname: '.hbs', // extension del archivo
    layoutsDir: path.join(app.get('views'), 'layouts'), // dirección de la carpeta de layouts
    partialsDir: path.join(app.get('views'), 'partials'), // dirección de la carpeta de layouts
    helpers: require('./lib/helpers')
}));
app.set('view engine', '.hbs');

// MIDDLEWARE
// para serializar json 
app.use(express.json())
// para interpretar datos de formas de html 
app.use(express.urlencoded({extended: false}));


// ROUTES // TODO: Usar routers
app.get('/api/usuarios', (req: Request, res: Response) => res.send('hello world'));

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


// SERVER
app.listen(app.get('port'), () => {
    console.log(`listening in port ${app.get('port')}`)
})

module.exports = app;