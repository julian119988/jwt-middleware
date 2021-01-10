const express = require("express");
const router = express.Router();
const UserModel = require("../models/users");

router.get("/", async (req, res, next) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (e) {
    res.status(413).send({ menssage: e.message });
    next(e);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const user = await UserModel.findOneAndDelete({
      usuario: req.body.usuario.toUpperCase(),
    });
    if (user == null) throw new Error("Usuario no encontrado.");
    res.status(200).json(user);
  } catch (e) {
    res.status(413).send({ message: e.message });
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { usuario: req.body.usuario.toUpperCase() },
      { clave: req.body.clave, email: req.body.email, cel: req.body.cel },
      { new: true }
    );
    if (user == null) throw new Error("Usuario no encontrado.");
    res.status(200).json(user);
  } catch (e) {
    res.status(413).send({ message: e.message });
  }
});

module.exports = router;
