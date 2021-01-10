const express = require("express");
const bcrypt = require("bcrypt");
const unless = require("express-unless");
const jwt = require("jsonwebtoken");
const app = express();
const db = require("./db");

app.use(express.json());
const registroRouter = require("./api/registro");

//Autenticacion

//Paso 1 registro
app.use("/registro", registroRouter);
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
