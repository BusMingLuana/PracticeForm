// Requerimientos 
const express = require('express')
const rutasMain = require('./routes/main')
const rutasProgramadores = require('./routes/programadores')
const methodoverride = require ('method-override');


// path 
let path = require('path');

const app = express()
// ejs borrar despues
app.set('view engine', 'ejs')
app.use(express.static('public'))


// Formularios json
app.use(express.urlencoded ({ extended: false }));
app.use(express.json());

app.use(methodoverride('_method'));
//Enrutamiento
app.use('/',rutasMain)
app.use('/programadores',rutasProgramadores)


// error
app.use((req,res,next)=>{
   res.status(404).render('not-found')
})

//  Puerto
app.listen(3002, ()=>{
   console.log('servidor corriendo en el puerto 3002');
})