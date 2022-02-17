const fs = require('fs');

function logDbMiddleware(req,res,next) {
    fs.writeFileSync('logDb.txt','Se creó el registro en: ' + req.url);
  
    next();  
}



module.exports=logDbMiddleware;