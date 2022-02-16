// Requerimientos 
const express = require('express')
// Ejecucion del metodo router de express, crear rutas
const router = express.Router();
const multer = require('multer'); 
const path = require('path')
const programersController = require('../controllers/programersController')

// multer: donde queremos que guarde esos archivos y con qué nombre
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        //  folderName = path.join(__dirname,'../public/images');
        cb(null,path.join(__dirname,'../public/images'))
    },
    filename:(req,file,cb) =>{
        console.log(file);
        const newFileName= "programer-" + Date.now() + path.extname(file.originalname);
        cb(null,newFileName)
    }
});

const upload = multer({storage})



 router.get('/', programersController.listar)

//  Rutas parametrizadas
router.get('/search', programersController.buscar)

// formulario
router.get('/form', programersController.form)
router.post('/form', upload.single('file'),programersController.create)//file es el nombre del input

// edit
router.get('/edit/:idProgramer', programersController.edit)
router.put('/edit', programersController.store)

// eliminar
router.delete('/delete/:idProgramer',programersController.delete)
// router.get('/search',programersController.buscar)
module.exports = router;