const express = require("express");

const router = express.Router();

const UserModel = require("../models/users");

router.post("/", async (req, res, next) => {
  const libro = new UserModel({
    usuario: req.body.usuario.toUpperCase(),
    clave: req.body.clave,
    email: req.body.email,
    cel: req.body.cel,
  });
  try {
    const libroGuardado = await libro.save();
    res.status(201).json(libroGuardado);
  } catch (error) {
    res.status(413);
    res.send("Error");
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const user = await UserModel.find();
    //const libro = await LibroModel.find().populate('persona_id');
    //populate muestra todos los datos de la persona que tiene el libro
    res.status(200).json(user);
  } catch (error) {
    res.status(413);
    res.send("mensaje: 'Error inesperado'");
    next(error);
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
