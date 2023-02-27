const jwt = require("jsonwebtoken");
const { Paciente, Medico, Hospital } = require("../models");

const validarJWT = async (req, res = response, next) => {
  //Leer los headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ msg: "No hay token en la petición" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //verificar token valido
    
    //Leer el usuario que corresponde al uid
    let usuario;

    usuario = await Paciente.findById(uid);
    
    if (!usuario) {
      usuario = await Medico.findById(uid);
      
    }
    if (!usuario) {
      usuario = await Hospital.findById(uid);
    }

    
    //Si usuario existe el que elimina
    if (!usuario) {
      return res.status(401).json({
        msg: "Usuario no valido",
      });
    }

    // Verificar si el uid estado esta activo el que elimina
    if (!usuario.status) {
      return res.status(401).json({
        msg: "Usuario no valido",
      });
    }
    req.usuario = usuario; //info en request
    next();

    //Error
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
