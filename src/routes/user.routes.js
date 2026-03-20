const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const userController = require("../controller/user.controller");

router.get("/profile", auth, userController.getProfile);

router.put("/profile", auth, userController.updateProfile);

router.get("/users", auth, role("admin"), userController.getAllUsers);

router.patch("/changePassword", auth ,userController.changePassword);

module.exports = router;