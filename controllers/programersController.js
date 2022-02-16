const fs = require('fs');
const path = require('path');
const jsonTable = require('../database/jsonTable');

const programersModel = jsonTable('programers');

const programersController = {
   listar:(req,res)=>{
   //    let programers = [
   //       {id:1,name:'Luana'},
   //       {id:2,name:'Alexis'},
   //       {id:3,name:'Jorge'},
   //       {id:4,name:'Franco'},
   //    ];
   //  res.render('programersList',{programers})
   let programers = programersModel.all();
   res.render('programersList', {programers})
   },
   
   buscar:(req,res)=>{
      let programadorBuscado= req.query.buscado;

      let programers = [
         {id:1,name:'luana'},
         {id:2,name:'alexis'},
         {id:3,name:'jorge'},
         {id:4,name:'franco'},
      ];
      let programadorEncontrado = []
      for (let i = 0; i < programers.length; i++) {
          if (programers[i].name.includes(programadorBuscado )) {
             programadorEncontrado.push(programers[i])
          }
         
      }
    res.render('programadorSearch', {programadorEncontrado})
 },
 form:(req,res) =>{
    res.render('form')
 },
 create:(req,res) =>{
    let programador = {
      ...req.body,
      fileName : req.file.filename
    }

    programerId = programersModel.create(programador)
   res.redirect('/programadores')

  console.log(programador)
},
edit: (req,res) =>{
    let idProgramer = req.params.idProgramer;
    let programers = [
      {id:1,name:'Luana',lastName:'Mingione'},
      {id:2,name:'Alexis',lastName:'Benitez'},
      {id:3,name:'Jorge',lastName:'Carloto'},
      {id:4,name:'Franco',lastName:'Sanchez'},
   ];

   let programerEdit= programers[idProgramer]
    res.render('programerEdit',{programerEdit})
},
store:(req,res) =>{
   res.send('put bien')
},
delete: (req,res) =>{
   res.send('delete bien')
}
 
}

module.exports = programersController;