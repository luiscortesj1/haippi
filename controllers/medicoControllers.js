const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { Medico, ServicioMedico, ObservacionM } = require("../models/index");
const { generarJWT } = require("../helpers/generar-jwt");
const { generarId } = require("../helpers/tokenValidacion");
const { emailRegistros } = require("../helpers/emailValidacion");

const controller = {
  userPut: (req, res = response) => {
    const id = req.params.id;
    res.json({
      msg: "put API - controller",
      id,
    });
  },
  

  medicoPost: async (req, res = response) => {
    const { nombre, email, identificacion, telefono, direccion, password } = req.body;
    const creado_por= "63fabb4d329288b4eff97476";
    const medico = new Medico({
      nombre,
      email,
      telefono,
      direccion,
      identificacion,
      password,
      token_cambio: generarId(),
      creado_por
    });

    const salt = bcryptjs.genSaltSync();
    medico.password = bcryptjs.hashSync(password, salt);
    await medico.save(); 

   
    emailRegistros({
      nombre: medico.nombre,
      email: medico.email,
      token: medico.token_cambio
    })

    res.json({
      msg: "post API - controller",
      medico,
    });
  },
  servicioMPost: async (req, res = response) => {
    const { servicioH } = req.body;
    const medicoService = req.usuario._id;;

    const servicioM = new ServicioMedico({
      medicoService,
      servicioH,
    });
    await servicioM.save();
    res.json({
      msg: "post API - mmScontroller",
      servicioM,
    });
  },
  consultasGet: async (req, res = response) => {
    const { limit = 5, offset = 0 } = req.query; //arguments

    const valStatus = { status: true }; // validar el status

    const medico = { atendido_por: req.usuario._id };

    const [total, data] = await Promise.all([
      ObservacionM.countDocuments(medico),
      ObservacionM.find(medico)
        .populate("paciente_atendido")
        .populate("atendido_por")
        .populate({
          path: "especialidad_medica",
          populate: { path: "hospitalService" },
        })
        .skip(Number(offset))
        .limit(Number(limit)),
    ]);
    res.json({
      total,
      data,
    });
  },

  medicoPostLogin: async (req, res = response) => {
    const { email, password } = req.body;

    try {
      // Verificar email
      const usuario = await Medico.findOne({ email });

      if (!usuario) {
        return res.status(404).json({
          msg: "El usuario o contraseña son incorrectos ",
        });
      }

      // Verificar el estado del usuario
      if (!usuario.status) {
        return res.status(404).json({
          msg: "El usuario o contraseña son incorrectos ",
        });
      }


      //Verificar la constraseña
      const validPassword = bcryptjs.compareSync(password, usuario.password);
      if (!validPassword) {
        return res.status(404).json({
          msg: "El usuario o contraseña son incorrectos",
        });
      }

      if (!usuario.validado) {
        return res.status(404).json({
          msg: "valide su usuario, mire su correo",
        });
      }

      //Generar JWT
      const token = await generarJWT(usuario.id);
      res.json({
        msg: "Login exitoso!",
        usuario,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Hable con el administrador",
      });
    }
  },

};

module.exports = controller;