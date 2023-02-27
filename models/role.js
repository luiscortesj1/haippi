const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    requied: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
