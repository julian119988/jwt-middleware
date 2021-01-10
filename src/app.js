const express = require("express");
const unless = require("express-unless");
const app = express();
const db = require("./db");
const cors = require("cors");

app.use(express.json());
const registroRouter = require("./api/registro");
const loginRouter = require("./api/login");
const listadoRouter = require("./api/listado");
const auth = require("./middleware");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(cors());
//Autenticacion

auth.unless = unless;
//Paso 1 registro
app.use(
  auth.unless({
    path: [
      { url: "/login", methods: ["POST", "GET"] },
      { url: "/registro", methods: ["POST", "GET"] },
      { url: "/", methods: ["POST", "GET"] },
    ],
  })
);

app.use("/listado", listadoRouter);
app.use("/registro", registroRouter);
app.use("/login", loginRouter);

/*
app.post("/registro", (req, res) => {
  try {
    if (
      !req.body.usuario ||
      !req.body.clave ||
      !req.body.email ||
      !req.body.cel
    ) {
      throw new Error("No enviaste todos los datos necesarios");
    }
  } catch (e) {
    res.status(413).send({ message: e.message });
  }
});
*/
//Paso 2 login

//Session

module.exports = app;
