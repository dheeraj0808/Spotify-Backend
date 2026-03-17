const router = require("express").Router();

const authController = require("../controller/auth.controller");

router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser);
router.patch("/forgetPassword",authentication.forgetPassword);

module.exports = router;