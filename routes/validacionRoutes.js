
const { Router } = require("express");
const router = Router();
const controller = require("../controllers/validacionControllers");



router.get("/:token", controller.validarCuenta);
router.get("/cambiarPass/:token", controller.validarTokenCambioPass);
router.post("/cambiarPass", controller.cambiarPass);
router.post("/nuevoPass/:token", controller.nuevoPass);



module.exports = router;
