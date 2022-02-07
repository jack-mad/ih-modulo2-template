//importaciones
const express = require('express');
const router = express.Router();

const indexController = require('./../controllers/indexController')
//router
router.get('/', indexController.getHome)

//exportacion
module.exports = router