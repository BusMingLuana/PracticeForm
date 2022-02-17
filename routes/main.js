// Requerimientos 
const express = require('express');
const { check } = require('express-validator');
// Ejecucion del metodo router de express, crear rutas
const router = express.Router()
const mainController = require('../controllers/main');


// rutas
router.get('/',mainController.index )

router.get('/pruebaSession',(req,res)=>{
    if (req.session.numeroVisita == undefined) {
        req.session.numeroVisita = 0;
    }

    req.session.numeroVisita ++;
   res.send('session tiene el numero: ' + req.session.numeroVisita)  
});

// Register:
router.get('/register', mainController.register);
router.post('/register',mainController.processRegister)

// Login
router.get('/login', mainController.login)
router.post('/login',[
    check('email').isEmail().withMessage('email invalido'),
    check('password').isLength({min:8}).withMessage('La contraseña es muy corta')
], mainController.processlogin)


 module.exports = router;

