const { response } = require("express");

const adminRole=(req, res=response,next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token'
        })
    }

    const {rol, nombre}=req.usuario;
    if(rol !== 'HOSPITAL_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador`
        })
    }

    next();
}

const medicoRole=(req, res=response,next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token'
        })
    }

    const {rol, nombre}=req.usuario;
    if(rol !== 'MEDICO_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es medico`
        })
    }
    next();
}
    



// si tiene rol
const tieneRol= (...roles) => {
    return (req, res=response,next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token'
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({msg:`El servicio requiere uno de estos roles ${roles}`})
        }
        next();
    }
}


module.exports ={adminRole, tieneRol, medicoRole}