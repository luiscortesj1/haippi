const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({
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

  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },

  rol: {
    type: String,
    required: true,
    default: "HOSPITAL_ROLE",
  },
  status: {
    type: Boolean,
    default: true,
  },

  validado: {
    type: Boolean,
    default: false,
  },
  token_cambio: {
    type: String,
    default: null,
  },
  cambio_pass: {
    type: Boolean,
    default: false,
  },
});

HospitalSchema.methods.toJSON = function () {
  /* instancia con los valores (objecto literal) se saca __v y password, los demas datos se guardan en usuario   */
  const { __v, password, _id, ...hospital } = this.toObject();
  hospital.uid = _id;
  return hospital;
};

module.exports = model("Hospital", HospitalSchema);
