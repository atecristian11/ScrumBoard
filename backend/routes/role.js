const express = require("express");
const router = express.Router(); //con esta se manipulan rutas para asi acceder a las api
const RoleController = require("../controllers/role"); //con esta importamos el controlador

router.post("/registerRole", RoleController.registerRole); //con el post porque con este le añadimos esto a la url final
// http://localhost:3001/api/role/listRole
router.get("/listRole", RoleController.listRole);

module.exports = router;
