const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    usuario: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    clave: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    cel: {
      type: mongoose.Schema.Types.Number,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("usuario", UserSchema);

module.exports = UserModel;
