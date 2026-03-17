const router = require("express").Router();

const authController = require("../controller/auth.controller");

router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser);
router.post("/forgetPassword",authController.forgetPassword);
router.post("/verifyOtp",authController.verifyOtp);
router.post("/resetPassword",authController.resetPassword);


module.exports = router;