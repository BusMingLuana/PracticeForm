// Requerimientos 
const express = require('express')
// Ejecucion del metodo router de express, crear rutas
const router = express.Router()
const formController = require('../controllers/formController')

router.get('/',formController.formulario)


module.exports = router;