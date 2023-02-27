const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { ObservacionM } = require("../models/index");

const controller = {



  observacionMGet: async(req, res = response) => {
    const valStatus = { status: true };
    const consultas= await ObservacionM.find(valStatus)
    .populate("paciente_atendido","nombre")
    .populate("atendido_por","nombre identificacion telefono")
    res.json({
      consultas
    });
  },
  userPut: (req, res = response) => {
    const id = req.params.id;
    res.json({
      msg: "put API - controller",
      id,
    });
  },

  observacionMPost: async (req, res = response) => {
    const {
      especialidad_medica,
      observacion,
      estado_salud,
      paciente_atendido,
    } = req.body;
    const atendido_por = req.usuario._id;
    const consulta = new ObservacionM({
      especialidad_medica,
      observacion,
      estado_salud,
      atendido_por,
      paciente_atendido,
    });

    await consulta.save();
    res.json({
      msg: "post API - convtroller",
      consulta,
    });
  },
};

module.exports = controller;
