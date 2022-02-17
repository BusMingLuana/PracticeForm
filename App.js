// Requerimientos 
const express = require('express')
const rutasMain = require('./routes/main')
const rutasProgramadores = require('./routes/programadores')
const methodoverride = require ('method-override');
const session = require('express-session');



// path 
let path = require('path');

// Middleware 
const logMiddleware = require('./middlewares/logMiddleware');
const cookieParser = require('cookie-parser');
const recordarUsuario = require('./middlewares/cookieAuthMiddleware')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(logMiddleware);

app.use(session({
   secret:'Clave secreta',
   resave: true,
   saveUninitialized: true
}));


// Formularios json
app.use(express.urlencoded ({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use(methodoverride('_method'));
 app.use(recordarUsuario)


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