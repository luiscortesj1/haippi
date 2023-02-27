const nodemailer = require("nodemailer");

const emailRegistros = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, email, token } = datos;

  // ? Enviar el mail
  await transport.sendMail({
    from: "Heippi.com",
    to: email,
    subject: "Confirma tu cuenta (pruebaHeippi)",
    text: "Confirma tu cuenta (pruebaHeippi)",
    html: ` <p> Hola ${nombre}, comprueba tu cuenta</p>
            
            <p>Tu cuenta ya esta lista, solo debes confimarla en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT}/api/validacion/${token}">Confirmar Cuenta</a></p>
            
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`,
  });
};

const emailCambiarconsenia = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, email, token } = datos;

  // ? Enviar el mail
  await transport.sendMail({
    from: "PruebaHeippi.com",
    to: email,
    subject: "Cambia la contraseña (PruebaHeippi)",
    text: "Cambia la contraseña (PruebaHeippi)",
    html: ` <p> Hola ${nombre}, cambia de password </p>
            
            <p>Sigue el siguiente enlace para generar tu nueva contraseña:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT}/api/validacion/cambiarPass/${token}">Restablecer contraseña</a></p>
            
            <p>Si tu no solicitaste el cambio de contraseña, puedes ignorar el mensaje</p>`,
  });
}
module.exports = {

  emailRegistros,
  emailCambiarconsenia
};