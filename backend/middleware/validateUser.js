const User = require("../models/user");

const user = async (req, res, next) => {
    const user = await User.findById(req.user._id); //con findByIDpara se puedo mirar que el id que esta dentro del json del payload si sea el mismo que esta en nuestra bd 
    if(!user) return res.status(400).send("Process failed: User without permission");
    next();
};

module.exports = user;
