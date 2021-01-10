const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) throw new Error("No estas logueado.");

    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        throw new Error({ error: "Token invalido." });
      }
      next();
    });
  } catch (e) {
    res.status(403).send({ message: e.message });
  }
};

module.exports = auth;
