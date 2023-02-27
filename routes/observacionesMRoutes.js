const { Router } = require("express");
const router = Router();
const controller = require("../controllers/observacionMControllers");
const { validarJWT } = require("../middlewares/validar-jwt");
const { medicoRole } = require("../middlewares/validar-roles");
const { validationCampos } = require("../middlewares/validationCampos");

router.put("/:id", controller.userPut);
router.post(
  "/",
  [validarJWT, medicoRole, validationCampos],
  controller.observacionMPost
);
router.get("/", controller.observacionMGet);

module.exports = router;
 