
const { check, validationResult, body } = require('express-validator')
const fs = require('fs')
const User = require('../models/User')

const mainController = {
    index: (req,res)=>{
     res.render('main/index')
          },
    login: (req,res)=>{
        return res.render('main/login')
    },
    register:(req,res)=>{
        res.render('main/register')
    },
    processRegister:(req,res) =>{
        
        User.create(req.body)
       return res.redirect('/register')
    },


    processlogin:(req,res) =>{
       let errors = validationResult(req);
       if(errors.isEmpty()){
        let usersJSON = fs.readFileSync('users.json',{encoding: 'utf-8'})
        let users;
        if(usersJSON ==''){
            users = []
        }else{
            users = JSON.parse(usersJSON)
        }
        let usuarioEncontrado
        for (let i = 0; i < users.length; i++) {
             if (users[i].email == req.body.email) {
                  usuarioEncontrado = users[i];
                 break;
                }  
            }
            if(usuarioEncontrado == undefined){
                return res.render('main/login', {errors: [
                    {msg:'Credenciales invalidas'}
                ]})
            }
         
        req.session.usuarioEncontrado = usuarioEncontrado;
        if (req.body.recordame != undefined) {
            res.cookie('recordame', usuarioEncontrado.email,{maxAge:60000})
        }
        res.send('exito')

       }else{
           return res.render('main/login', {errors: errors.errors})
       }
    }

 }
 
 module.exports = mainController;