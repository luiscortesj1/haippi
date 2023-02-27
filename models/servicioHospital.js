const { Schema, model } = require("mongoose");

const ServicioHospitalSchema = Schema({
  servicio: {
    type: String,
    requied: [true, "los servicios son obligatorios"],
  },
  hospitalService:{
    type: Schema.Types.ObjectId,
    ref: "Hospital",
    require:true
  },
  status: {
    type: Boolean,
    default: true,
  },
});



module.exports = model("ServicioHospital", ServicioHospitalSchema);
