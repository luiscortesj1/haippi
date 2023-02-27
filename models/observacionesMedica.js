const { Schema, model } = require("mongoose");

const ObservacionSchema = Schema({
  especialidad_medica:{
    type: Schema.Types.ObjectId,
    ref: "ServicioHospital",
    require:true
  },
  observacion:{
    type: String,

  }, 
  estado_salud:{
    type: String,
  }, 
  atendido_por:{
    type: Schema.Types.ObjectId,
    ref: "Medico",
    require:true
  },
  paciente_atendido:{
    type: Schema.Types.ObjectId,
    ref: "Paciente",
    require:true
  }
});

module.exports = model("Observacion", ObservacionSchema)