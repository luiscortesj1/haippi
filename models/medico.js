const { Schema, model } = require("mongoose");

const MedicoSchema = Schema({
  identificacion: {
    type: Number,
    required: [true, "La identificación es obligatoria"],
  },
  nombre:{
    type:String,
    required: [true,"El nombre debe ser obligatorio"]
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
    require:[true,"La dirección es obligatoria"]
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },
  
  token_cambio: {
    type: String,
    default: null,
  },
  rol: {
    type: String,
    required: true,
    default:"MEDICO_ROLE",
  },
  status: {
    type: Boolean,
    default: true,
  },

  validado:{
    type: Boolean,
    default: false,
  }, 
  creado_por:{
    type: Schema.Types.ObjectId,
    ref: "Hospital",
    require:true
  },
  cambio_pass:{
    type:Boolean,
    default: false,
  }
  
});

MedicoSchema.methods.toJSON = function () {
  /* instancia con los valores (objecto literal) se saca __v y password, los demas datos se guardan en usuario   */
  const { __v, password, _id, ...medico } = this.toObject();
  medico.uid = _id;
  return medico;
};

module.exports = model("Medico", MedicoSchema)