const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { ServicioHospital, Hospital, ObservacionM } = require("../models/index");
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

  hospitalPost: async (req, res = response) => {
    const { nombre, email, telefono, direccion, password } = req.body;
    const hospital = new Hospital({
      nombre,
      email,
      telefono,
      direccion,
      token_cambio: generarId(),
      password,
    });

    const salt = bcryptjs.genSaltSync();
    hospital.password = bcryptjs.hashSync(password, salt);
    await hospital.save();

    emailRegistros({
      nombre: hospital.nombre,
      email: hospital.email,
      token: hospital.token_cambio,
    });

    res.json({
      msg: "post API - controller",
      hospital,
    });
  },

  servicioHPost: async (req, res = response) => {
    const { servicio } = req.body;
    const hospitalService = req.usuario._id;

    const servicioH = new ServicioHospital({
      servicio,
      hospitalService,
    });
    await servicioH.save();
    res.json({
      msg: "post API - Scontroller",
      servicioH,
    });
  },
  hospitalPostLogin: async (req, res = response) => {
    const { email, password } = req.body;

    try {
      // Verificar email
      const usuario = await Hospital.findOne({ email });

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
      if (!usuario.validado) {
        return res.status(404).json({
          msg: "valide su usuario, mire su correo",
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

  consultasGet: async (req, res = response) => {
    const { limit = 5, offset = 0 } = req.query; //arguments

    const valStatus = req.usuario._id; // validar el status

    const datas = await ObservacionM.find()
      .populate("paciente_atendido")
      .populate("atendido_por")
      .populate({
        path: "especialidad_medica",
        populate: {
          path: "hospitalService",
        },
      })
      .skip(Number(offset))
      .limit(Number(limit));

    const data = datas.filter((hospital) => {
      return hospital.especialidad_medica.hospitalService._id.equals(
        req.usuario._id
      );
    });

    const total = data.length;

    res.json({
      total,
      data,
    });
  },
};

module.exports = controller;
