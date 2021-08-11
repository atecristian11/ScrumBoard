const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/registerUser", UserController.registerUser);
router.get("/listUser/:name?", UserController.listUser); //lo colocamos asi cuando necesitamos un parametro en la url

module.exports = router;
