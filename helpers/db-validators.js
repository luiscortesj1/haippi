const { Hospital, Paciente, Medico } = require("../models/");

const validator = {
  //verificar correo
  emailExistente: async (email = "") => {
    let findEmail = await Hospital.findOne({ email });

    if (!findEmail) {
      findEmail = await Paciente.findOne({ email });
    }

    if (!findEmail) {
      findEmail = await Medico.findOne({ email });
    }

    if (findEmail) {
      throw new Error("El correo ya está registrado");
    }
  },
};

module.exports = validator;
