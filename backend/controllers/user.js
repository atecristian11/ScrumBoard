const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).sent("Process failed: Incomplete data");

  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res
      .status(400)
      .send("Process failed: The email user is already registered");

  let hash = await bcrypt.hash(req.body.password, 10); //con hash se encripta la clave con la libreria de bcrypt

  let role = await Role.findOne({ name: "user" });
  if (!role)
    return res.status(400).send("Process failed: No role was assigned");
  //le asignamod el role al usuario de user
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Failed to register user");
  //convertimos la info de la persona a ergistrar en algo encriptado
  try {
    let jwt = user.generateJWT();
    return res.status(200).send({ jwt });
  } catch (e) {
    return res.status(400).send("Failed to register user");
  }
};
//con esto es para que podamos crear un filtro para buscar a una persona al listar la info y la creamos con una expresion regular
// ('/Az\25/&&'%')
const listUser = async (req, res) => {
  let user = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("roleId")
    .exec(); //el populate sirve para que para que nos muestre el rol pero desencriptado
  if (!user || !user.length === 0) return res.status(400).send("No users");
  return res.status(200).send({ user });
};

module.exports = { registerUser, listUser };
