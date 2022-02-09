//importaciones
const express = require('express');
const router = express.Router();

const indexController = require('./../controllers/indexController')
const routeGuard = require("./../middlewares/routeGuard")
//router
router.get('/', indexController.getHome)
//profile route
router.get('/profile', routeGuard.privateAreas, indexController.getProfile)

//exportacion
module.exports = router