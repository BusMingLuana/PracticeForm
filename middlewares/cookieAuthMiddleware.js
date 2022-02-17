function recordarUsuario(req,res,next){
   next();

   if (req.cookies.recordame != undefined && req.session.usuarioEncontrado == undefined) {
  
     let usersJSON = fs.readFileSync('users.json',{encoding: 'utf-8'})
     let users;
     if(usersJSON == ''){
         users = []
     }else{
         users = JSON.parse(usersJSON)
     }
     let usuarioEncontrado;
     
     for (let i = 0; i < users.length; i++) {
          if (users[i].email == req.cookies.recordame) {
               usuarioEncontrado = users[i];
              break;
             }  
         }
         req.session.usuarioEncontrado = usuarioEncontrado;
    }
}

module.exports= recordarUsuario;