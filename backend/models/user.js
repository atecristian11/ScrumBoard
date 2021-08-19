const mongoose = require("mongoose"); //con esta traemos la libreria de mongo
const jwt = require("jsonwebtoken");
const moment = require("moment"); //sirve para dar formatos de fecha

//sirve para crear el esquema de usuario en la bd dentro de un json
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" }, //con este le decimos a la bd que va tener un id con ObjID y la referencia es de role
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

userSchema.methods.generateJWT = function () {
  //con esta funcion encriptamos la info del usuario
  return jwt.sign(
    {
      _id: this._id, //el this hace referencia a losdatos locales del json de userSchema
      name: this.name,
      roleId: this.roleId,
      iat: moment().unix(), //con este ya obtenemos ese codigo cuando se genere el jsonwebtoken
    },
    process.env.SECRET_KEY_JWT //con este le colocamos nuestra palabra clave a los documentos
  );
};

const user = mongoose.model("user", userSchema); //creamos una variable para convertirlo a modulo
module.exports = user; //exportamos el esquema al modulo
