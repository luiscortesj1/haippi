const jwt = require("jsonwebtoken");

//uid = user identify
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const playload = { uid };
        //headers,playload, Signature o firma
    jwt.sign(
      playload,
      process.env.SECRETORPRIVATEKEY, //llave secreta
      { expiresIn: "4h" },
      (err, token) => {
        //expireIn=tiempo de caducidad
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  }); //End Promise
};

module.exports = {
  generarJWT,
};
