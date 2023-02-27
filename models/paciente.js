const { Schema, model } = require("mongoose");

const PacienteSchema = Schema({
  identificacion: {
    type: Number,
    required: [true, "La identificación es obligatoria"],
  },
  nombre: {
    type: String,
    required: [true, "El nombre debe ser obligatorio"],
  },

  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  telefono: {
    type: Number,
    required: [true, "El teléfono es obligatorio"],
    unique: false,
  },
  direccion: {
    type: String,
    require: [true, "La dirección es obligatoria"],
  },
  fecha_nacimiento: {
    type: Date,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },

  rol: {
    type: String,
    required: true,
    default: "PACIENTE_ROLE",
  },
  status: {
    type: Boolean,
    default: true,
  },

  token_cambio: {
    type: String,
    default: null,
  },

  validado: {
    type: Boolean,
    default: false,
  },
  cambio_pass: {
    type: Boolean,
    default: true,
  },
});

PacienteSchema.methods.toJSON = function () {
  /* instancia con los valores (objecto literal) se saca __v y password, los demas datos se guardan en usuario   */
  const { __v, password, _id, ...paciente } = this.toObject();
  paciente.uid = _id;
  return paciente;
};

module.exports = model("Paciente", PacienteSchema);
