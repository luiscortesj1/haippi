const { Router } = require("express");
const router = Router();
const controller = require("../controllers/medicoControllers");
const { validarJWT } = require("../middlewares/validar-jwt");
const { adminRole, medicoRole } = require("../middlewares/validar-roles");
const { validationCampos } = require("../middlewares/validationCampos");
const validators = require("../helpers/db-validators");
const { check } = require("express-validator");

router.put("/:id", controller.userPut);
router.post(
  "/",
  [
    check("email", "El correo no es válido").custom(validators.emailExistente),
    validarJWT,
    adminRole,
    validationCampos,
  ],
  controller.medicoPost
);
router.post(
  "/servicio",
  [validarJWT, medicoRole, validationCampos],
  controller.servicioMPost
);
router.post("/login", controller.medicoPostLogin);
router.get(
  "/consultas",
  [validarJWT, medicoRole, validationCampos],
  controller.consultasGet
);

module.exports = router;
