const { Router } = require("express");
const router = Router();
const controller = require("../controllers/hospitalControllers");
const { validarJWT } = require("../middlewares/validar-jwt");
const { adminRole } = require("../middlewares/validar-roles");
const { validationCampos } = require("../middlewares/validationCampos");
const validators = require("../helpers/db-validators");
const { check } = require("express-validator");

router.put("/:id", controller.userPut);
router.post(
  "/",
  [
    check("email", "El correo no es válido").custom(validators.emailExistente),
    validationCampos,
  ],
  controller.hospitalPost
);
router.post("/login", controller.hospitalPostLogin);
router.post(
  "/servicio",
  [validarJWT, adminRole, validationCampos],
  controller.servicioHPost
);
router.get(
  "/consultas",
  [validarJWT, adminRole, validationCampos],
  controller.consultasGet
);

module.exports = router;
