
const bcryptjs = require('bcryptjs')
const { check, validationResult, body } = require('express-validator')
const res = require('express/lib/response')
const fs = require('fs')
const User = require('../models/User')


const mainController = {
    index: (req,res)=>{
     res.render('main/index')
          },
          register:(req,res)=>{
              res.render('main/register')
            },
            
         processRegister:(req,res) =>{
                
            let userInDb = User.findByField('email', req.body.email);
            if (userInDb) {
                    res.send('el email ya está registrado')
             }
                
             let userToCreate = {
                    ...req.body,
                    password: bcryptjs.hashSync(req.body.password,10)
             }
             User.create(userToCreate)
                return res.redirect('/login')
            },
            login: (req,res)=>{
                return res.render('main/login')
            },
            processlogin: (req,res) =>{
                let userToLogin = User.findByField('email', req.body.email);
                if (userToLogin) {
                    let passwordOk = bcryptjs.compareSync(req.body.password,userToLogin.password);
                    if (passwordOk) {
                       return res.send(passwordOk)
                    }
                    return res.render('main/login',{
                        errors:{
                            email:{
                                msg:'las credenciales son invalidas'
                            }
                        }
                    })
                }

                return res.render('main/login',{
                    errors:{
                        email:{
                            msg:'No se encuentra el email en la base de datos'
                        }
                    }
                })
            }
            
    // processlogin:(req,res) =>{
    //    let errors = validationResult(req);
    //    if(errors.isEmpty()){
    //     let usersJSON = fs.readFileSync('users.json',{encoding: 'utf-8'})
    //     let users;
    //     if(usersJSON ==''){
    //         users = []
    //     }else{
    //         users = JSON.parse(usersJSON)
    //     }
    //     let usuarioEncontrado
    //     for (let i = 0; i < users.length; i++) {
    //          if (users[i].email == req.body.email) {
    //               usuarioEncontrado = users[i];
    //              break;
    //             }  
    //         }
    //         if(usuarioEncontrado == undefined){
    //             return res.render('main/login', {errors: [
    //                 {msg:'Credenciales invalidas'}
    //             ]})
    //         }
         
    //     req.session.usuarioEncontrado = usuarioEncontrado;
    //     if (req.body.recordame != undefined) {
    //         res.cookie('recordame', usuarioEncontrado.email,{maxAge:60000})
    //     }
    //     res.send('exito')

    //    }else{
    //        return res.render('main/login', {errors: errors.errors})
    //    }
    // }

 }
 
 module.exports = mainController;