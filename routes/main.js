// Requerimientos 
const express = require('express');
// Ejecucion del metodo router de express, crear rutas
const router = express.Router()
const mainController = require('../controllers/main');


// rutas
router.get('/',mainController.index )
// Formulario
// router.get('/form',mainController.form);

 module.exports = router;

