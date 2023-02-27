const { Schema, model } = require("mongoose");

const ServicioMedicoSchema = Schema({
  servicioH: {
    type: Schema.Types.ObjectId,
    ref: "ServicioHospital",
    require: true,
  },
  medicoService: {
    type: Schema.Types.ObjectId,
    ref: "Medico",
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("ServicioMedico", ServicioMedicoSchema);
