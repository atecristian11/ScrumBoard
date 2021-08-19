const User = require("../models/user");
const mongoose = require("mongoose");

const user = async (req, res, next) => {
  const validId = mongoose.Types.ObjectId.isValid(req.user._id);//con esto nos valida que sea un id valido de mongo para mayor seguridad
  if(!validId) return res.status(400).send("Process failed: Invalid  id"); 

  const user = await User.findById(req.user._id); //con findByIDpara se puedo mirar que el id que esta dentro del json del payload si sea el mismo que esta en nuestra bd
  if (!user)
    return res.status(400).send("Process failed: User without permission");
  next();
};

module.exports = user;
