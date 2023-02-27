const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const controller = require("../controllers/pacienteControllers");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validationCampos } = require("../middlewares/validationCampos");
const validators = require("../helpers/db-validators");

router.put("/:id", controller.userPut);
router.post("/",[check("email", "El correo no es válido").custom(validators.emailExistente),validationCampos], controller.pacientePost);
router.post("/login", controller.pacientePostLogin);
router.get("/get", [validarJWT, validationCampos], controller.pacienteGet);
router.get("/consultas", [validarJWT, validationCampos], controller.consultasGet);



module.exports = router;
