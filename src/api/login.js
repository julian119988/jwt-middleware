const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const UserModel = require("../models/users");

router.post("/", async (req, res) => {
  try {
    if (!req.body.usuario || !req.body.clave) throw new Error("Faltan datos.");
    const user = await UserModel.find({
      usuario: req.body.usuario.toUpperCase(),
    });
    if (!user[0]) throw new Error("Nombre de usuario o contraseña incorecta.");
    if (!bcrypt.compareSync(req.body.clave, user[0].clave))
      throw new Error("Nombre de usuario o contraseña incorecta.");
    const tokenData = {
      usuario: req.body.usuario,
      email: req.body.email,
      cel: req.body.cel,
    };
    const token = jwt.sign(tokenData, process.env.SECRET, {
      expiresIn: 60 * 60 * 24,
    }); //expira en 24hrs
    res.header({ token });
  } catch (e) {
    res.status(413).send({ message: e.message });
  }
});

module.exports = router;
