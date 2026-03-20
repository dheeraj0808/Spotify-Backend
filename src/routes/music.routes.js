const express = require("express");
const router = express.Router();
const { createMusic } = require("../controller/music.controller");
const multer = require("multer");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const upload = multer({
    storage:multer.memoryStorage()
});

router.post("/create", authMiddleware, roleMiddleware("artist"), upload.single("music"), createMusic);

module.exports = router;