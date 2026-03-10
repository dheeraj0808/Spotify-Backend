const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const userController = require("../controller/user.controller");

router.get("/profile",auth,userController.getProfile);

router.get("/users",auth,userController.getAllUsers);

module.exports = router;