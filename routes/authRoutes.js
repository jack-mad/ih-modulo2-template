//importaciones
const express = require('express');
const router =express.Router();
const authController =require('../controllers/authController');
const routeGuard = require('../middlewares/routeGuard');

//router
//signup - obtener pagina
router.get('/register', routeGuard.authAreas, authController.register)

//login enviar formulario
router.post('/register', routeGuard.authAreas, authController.registerForm)

//login - obtener pagina
router.get('/login', routeGuard.authAreas, authController.login)

//login - enviar formulario de logi
router.post("/login", routeGuard.authAreas, authController.loginForm)

//logout
router.get('/logout', authController.logout)

//exportacion
module.exports = router