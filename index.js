
// importaciones

const express = require('express');
const app = express();
const hbs = require('hbs');
const connectDB = require('./config/db');

//middlewares
require('dotenv').config();
connectDB();
app.use(express.static('public'))
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

//ruteo
app.use('/',require('./routes/routes'))

//servidor
app.listen(process.env.PORT, () => console.log(`Servidor activo en puerto ${process.env.PORT}`))