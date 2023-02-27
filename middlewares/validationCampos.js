/* mostrar los errores de los campos que pasan en las routes 
al final de verificar los campos */

const {validationResult} = require('express-validator')

const validationCampos=(req,res, next)=>{
    
    const errors = validationResult(req); // express validator 
      if(!errors.isEmpty()){
          return res.status(400).json(errors);
      }
    
    next();
}

module.exports={
    validationCampos
}