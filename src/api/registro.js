const express = require("express");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const router = express.Router();

const UserModel = require("../models/users");

router.post("/", async (req, res, next) => {
  try {
    if (
      !req.body.usuario ||
      !req.body.clave ||
      !req.body.email ||
      !req.body.cel
    ) {
      throw new Error("No enviaste todos los datos necesarios");
    }
    const user = await UserModel.find({
      usuario: req.body.usuario.toUpperCase(),
    });
    if (user[0]) throw new Error("Usuario ya registrado.");
    const claveEncriptada = await bcrypt.hash(req.body.clave, 10);
    const newUser = new UserModel({
      usuario: req.body.usuario.toUpperCase(),
      clave: claveEncriptada,
      email: req.body.email,
      cel: req.body.cel,
    });
    const userSaved = await newUser.save();
    res.status(201).json(userSaved);
  } catch (e) {
    res.status(413).send({ message: e.message });
    next(e);
  }
});

router.get("/", (req, res) => {
  res.render("registro");
});

module.exports = router;
