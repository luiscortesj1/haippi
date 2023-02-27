const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");

class Server {
  //class
  constructor() {
    //Methods
    this.app = express(); //propiedad
    this.port = process.env.PORT;
    this.paths = {
      pacientes: "/api/pacientes",
      hospital: "/api/hospital",
      medicos: "/api/medicos",
      consultas: "/api/consultas",
      validacion:"/api/validacion"
    };
    //concetar DB
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //routes
    this.routes();
  }

  // Conexion DB
  async conectarDB() {
    await dbConection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio public 
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.pacientes, require("../routes/pacienteRoutes"));
    this.app.use(this.paths.hospital, require("../routes/hospitalRoutes"));
    this.app.use(this.paths.medicos, require("../routes/medicoRoutes"));
    this.app.use(this.paths.consultas, require("../routes/observacionesMRoutes"));
    this.app.use(this.paths.validacion, require("../routes/validacionRoutes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("listening on port " + this.port);
    });
  }
}

module.exports = Server;
