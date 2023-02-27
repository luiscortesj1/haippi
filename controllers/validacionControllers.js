const { emailCambiarconsenia } = require("../helpers/emailValidacion");
const { Paciente, Hospital, Medico } = require("../models");
const { generarId } = require("../helpers/tokenValidacion");
const bcryptjs = require("bcryptjs");
const controller = {
  validarCuenta: async (req, res = response) => {
    const { token } = req.params;
    try {
      let usuario = await Paciente.findOne({ token_cambio: token });

      if (!usuario) {
        usuario = await Hospital.findOne({ token_cambio: token });
      }
      if (!usuario) {
        usuario = await Medico.findOne({ token_cambio: token });
      }

      usuario.token_cambio = null;
      usuario.validado = true;
      await usuario.save();

      return res.status(200).json({
        exito: true,
        msg: "Cuenta confirmada",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  },
  validarTokenCambioPass: async (req, res = response) => {
    const { token } = req.params;
    try {
      let usuario = await Paciente.findOne({ token_cambio: token });

      if (!usuario) {
        usuario = await Hospital.findOne({ token_cambio: token });
      }
      if (!usuario) {
        usuario = await Medico.findOne({ token_cambio: token });
      }

      if (!usuario) {
        return res.status(400).json({
          exito: false,
          msg: "Token no valido",
        });
      }
      return res.status(200).json({
        exito: true,
        msg: "Token valido",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  },

  cambiarPass: async (req, res = response) => {
    const { email } = req.body;

    let usuario = await Paciente.findOne({ email });

    if (!usuario) {
      usuario = await Hospital.findOne({ email });
    }
    if (!usuario) {
      usuario = await Medico.findOne({ email });
    }

    if (!usuario) {
      return res.status(404).json({
        msg: "El usuario no existe",
      });
    }
    if (!usuario.validado) {
      return res.status(404).json({
        msg: "Primero valide su usuario y despues solicite el cambio",
      });
    }

    usuario.token_cambio = generarId();
    await usuario.save();

    emailCambiarconsenia({
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token_cambio,
    });

    try {
      return res.status(200).json({
        exito: true,
        msg: "hemos enviado un email con las instruciones",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  },

  nuevoPass: async (req, res = response) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      let usuario = await Paciente.findOne({ token_cambio: token });

      if (!usuario) {
        usuario = await Hospital.findOne({ token_cambio: token });
      }
      if (!usuario) {
        usuario = await Medico.findOne({ token_cambio: token });
      }
      if (!usuario) {
        return res.status(404).json({
          msg: "Token no valido",
        });
      }
      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);
      usuario.token_cambio = null;
      await usuario.save();

      return res.status(200).json({
        exito: true,
        msg: "contraseña cambiada",
      });
    } catch (error) {
      return res.status(400).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  },
};

module.exports = controller;
