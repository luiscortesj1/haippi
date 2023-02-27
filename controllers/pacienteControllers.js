const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { Paciente, ObservacionM } = require("../models/index");
const { generarJWT } = require("../helpers/generar-jwt");
const { populate } = require("../models/hospital");
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
  pacienteGet: (req, res = response) => {
    res.json({
      msg: "put API - validado jsonTcontroller",
    });
  },

  pacientePost: async (req, res = response) => {
    const {
      nombre,
      email,
      identificacion,
      telefono,
      direccion,
      fecha_nacimiento,
      password,
    } = req.body;
    const paciente = new Paciente({
      nombre,
      email,
      telefono,
      direccion,
      fecha_nacimiento,
      password,
      identificacion,
      token_cambio: generarId()
    });

    const salt = bcryptjs.genSaltSync();
    paciente.password = bcryptjs.hashSync(password, salt);
    await paciente.save();

    emailRegistros({
      nombre: paciente.nombre,
      email: paciente.email,
      token: paciente.token_cambio
    })

    res.json({
      msg: "post API - controller",
      paciente,
    });
  },

  consultasGet: async (req, res = response) => {
    const { limit = 5, offset = 0 } = req.query; //arguments

    const valStatus = { status: true }; // validar el status

    const paciente = { paciente_atendido: req.usuario._id };

    const [total, data] = await Promise.all([
      ObservacionM.countDocuments(paciente),
      ObservacionM.find(paciente)
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

  pacientePostLogin: async (req, res = response) => {
    const { email, password } = req.body;

    try {
      // Verificar email
      const usuario = await Paciente.findOne({ email });

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

      //Generar JWT
      const token = await generarJWT(usuario.id);
      res.json({
        msg: "Login ok",
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
